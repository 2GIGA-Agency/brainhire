'use client';
import React, { useState, useEffect } from 'react';
import {
	Box,
	Button,
	Checkbox,
	FileUpload,
	Flex,
	PinInput,
	Stack,
	Text,
	useFileUpload,
} from '@chakra-ui/react';
import Image from 'next/image';
import axios from 'axios';
import { toaster } from '@/components/ui/toaster';
import { InputFilters, LkInput } from '@/components/shared/LkInput';
import { PERSONAL_DATA_CONSENT_LINK, PRIVACY_POLICY_LINK } from '@/constants/links';
import styles from './styles.module.scss';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { vacancyResponseSchema, VacancyResponseFormValues } from './types';
import { CustomFileUploadList } from '@/components/shared/CustomFileUploadList';

interface VacancyResponseFormProps {
	vacancy: any;
}

export const ExternalForm: React.FC<VacancyResponseFormProps> = ({ vacancy }) => {
	const [verifyEmail, setVerifyEmail] = useState(false);
	const [confirmedEmail, setConfirmedEmail] = useState('');
	const [pinValue, setPinValue] = useState(['', '', '', '']);
	const [confirmCodeLoading, setConfirmCodeLoading] = useState(false);
	const [confirmCodeError, setConfirmCodeError] = useState(false);
	const [confirmCodeErrorText, setConfirmCodeErrorText] = useState('');
	const [sendCodeLoading, setSendCodeLoading] = useState(false);
	const [finalSuccessStep, setFinalStepSuccess] = useState(false);

	const {
		control,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<VacancyResponseFormValues>({
		resolver: zodResolver(vacancyResponseSchema),
		mode: 'onSubmit',
		reValidateMode: 'onChange',
		defaultValues: {
			lastName: '',
			firstName: '',
			email: '',
			resume: [],
			privacyPolicy: false,
			personalDataConsent: false,
		},
	});

	const singleFileUpload = useFileUpload({
		maxFiles: 1,
		maxFileSize: 5 * 1000 * 1000,
		minFileSize: 1.6 * 1000,
		accept: 'application/pdf',
		onFileAccept: (details) => {
			setValue('resume', details.files, { shouldValidate: true });
		},
		onFileReject: (details) => {
			const fileError = details.files[0].errors[0];
			let message = '';

			switch (fileError) {
				case 'FILE_INVALID_TYPE':
					message = 'Поддерживаются только файлы формата .pdf';
					break;
				case 'FILE_TOO_LARGE':
					message = 'Размер файла не должен превышать 5 МБ';
					break;
				case 'FILE_TOO_SMALL':
					message = 'Файл повреждён или пустой';
					break;
				default:
					message = fileError;
					break;
			}
			if (message) {
				toaster.error({ title: message });
			}
		},
	});

	// Следим за состоянием формы и синхронизируем UI useFileUpload
	// Это нужно для того, чтобы UI (список файлов) всегда отражал реальное состояние формы
	const resumeFromForm = watch('resume');
	useEffect(() => {
		// Если в форме есть файлы, а в UI их нет - добавляем
		if (resumeFromForm.length > 0 && singleFileUpload.acceptedFiles.length === 0) {
			singleFileUpload.setFiles(resumeFromForm);
		}
		// Если в форме пусто, а в UI есть - очищаем
		else if (resumeFromForm.length === 0 && singleFileUpload.acceptedFiles.length > 0) {
			singleFileUpload.clearFiles();
		}
	}, [resumeFromForm, singleFileUpload]);

	const clearFilesAndForm = () => {
		singleFileUpload.clearFiles();
		setValue('resume', [], { shouldValidate: true });
	};

	const sendResume = (formDataValues: VacancyResponseFormValues) => {
		if (!vacancy || formDataValues.resume.length === 0) return;
		const file = formDataValues.resume[0];
		const formData = new FormData();
		formData.append('email', formDataValues.email);
		formData.append('vacancy_id', vacancy.id);
		formData.append('vacancy_stack', vacancy.skills.join(','));
		formData.append('required_work_experience', vacancy.required_work_experience);
		formData.append('candidate_resume', file);

		const promise = axios.post('/api/resumes/external_link/', formData).catch((error) => {
			alert(error.response.data.error);
			throw error;
		});

		toaster.promise(promise, {
			success: {
				title: 'Отклик отправлен!',
			},
			error: {
				title: 'Возникла ошибка, попробуйте позже...',
			},
			loading: { title: 'Отправляем резюме...' },
		});
	};

	const confirmCode = async () => {
		setConfirmCodeLoading(true);
		setConfirmCodeError(false);
		try {
			const validatedData = watch();
			await axios.post('/api/candidates/confirm_code/', {
				code: parseInt(pinValue.join('')),
				email: confirmedEmail,
				vacancy_with_interview: vacancy,
			});
			sendResume(validatedData as VacancyResponseFormValues);
			setFinalStepSuccess(true);
		} catch (error: any) {
			setConfirmCodeError(true);
			setConfirmCodeErrorText(error.response.data.error);
			console.error('Ошибка при отправке кода:', error);
		} finally {
			setConfirmCodeLoading(false);
		}
	};

	const onFormSubmit = async (data: VacancyResponseFormValues) => {
		setSendCodeLoading(true);
		try {
			await axios.post('/api/candidates/external_link/send_code/', {
				vacancy_id: vacancy?.id,
				vacancy_root_id: vacancy?.root_id,
				interview_id: vacancy.active_interview?.id ?? '',
				email: data.email,
				first_name: data.firstName,
				last_name: data.lastName,
			});
			setConfirmedEmail(data.email);
			setVerifyEmail(true);
		} catch (error: any) {
			console.error('Ошибка при отправке кода:', error);
			alert(error.response.data.error);
		} finally {
			setSendCodeLoading(false);
		}
	};

	const reSendCode = async () => {
		setPinValue(['', '', '', '']);
		setConfirmCodeError(false);
		setSendCodeLoading(true);
		try {
			await axios.post('/api/candidates/external_link/send_code/', {
				vacancy_id: vacancy?.id,
				vacancy_root_id: vacancy?.root_id,
				interview_id: vacancy.active_interview?.id ?? '',
				email: confirmedEmail,
				first_name: watch('firstName'),
				last_name: watch('lastName'),
			});
		} catch (error: any) {
			console.error('Ошибка при повторной отправке кода:', error);
			alert(error.response.data.error);
		} finally {
			setSendCodeLoading(false);
		}
	};

	return (
		<div className={styles.secondaryBlock}>
			<div className={styles.limits}>
				<Text textStyle="md" mb={6} fontWeight={500} pl={6}>
					Откликнуться на вакансию
				</Text>
				<Stack borderTop="1px solid rgba(226, 232, 240, 1)" pt={6}>
					<div className={styles.px}>
						{finalSuccessStep ? (
							<Text textStyle="md" mb={4} fontWeight={500} mt={4} textAlign="center">
								Спасибо! Ваше резюме отправлено в обработку!
							</Text>
						) : !verifyEmail ? (
							<form onSubmit={handleSubmit(onFormSubmit)}>
								<Stack gap={4}>
									<div>
										<Controller
											name="lastName"
											control={control}
											render={({ field }) => (
												<LkInput
													allowedChars={InputFilters.onlyLetters}
													placeholder="Фамилия"
													{...field}
												/>
											)}
										/>
										{errors.lastName && (
											<Text textStyle="sm" color="red.500" mt={1}>
												{errors.lastName.message}
											</Text>
										)}
									</div>

									<div>
										<Controller
											name="firstName"
											control={control}
											render={({ field }) => (
												<LkInput
													allowedChars={InputFilters.onlyLetters}
													placeholder="Имя"
													{...field}
												/>
											)}
										/>
										{errors.firstName && (
											<Text textStyle="sm" color="red.500" mt={1}>
												{errors.firstName.message}
											</Text>
										)}
									</div>

									<div>
										<Controller
											name="email"
											control={control}
											render={({ field }) => (
												<LkInput
													placeholder="Email"
													allowedChars={InputFilters.email}
													type="email"
													{...field}
												/>
											)}
										/>
										{errors.email && (
											<Text textStyle="sm" color="red.500" mt={1}>
												{errors.email.message}
											</Text>
										)}
									</div>

									<Controller
										name="resume"
										control={control}
										render={({ field: { onBlur, name, ref } }) => {
											const fileUploadApi = {
												...singleFileUpload,
												clearFiles: clearFilesAndForm,
											};
											return (
												<>
													<FileUpload.RootProvider value={fileUploadApi}>
														<FileUpload.HiddenInput ref={ref} name={name} onBlur={onBlur} />
														<FileUpload.Dropzone>
															<Image
																src="/icons/upload.svg"
																alt="Upload Icon"
																width={24}
																height={24}
															/>
															<FileUpload.DropzoneContent>
																<Box>Выберите резюме или перетащите его сюда</Box>
																<Box>.pdf до 5MB</Box>
															</FileUpload.DropzoneContent>
														</FileUpload.Dropzone>
														<CustomFileUploadList fileUploadApi={fileUploadApi} />
													</FileUpload.RootProvider>
													{errors.resume && (
														<Text textStyle="sm" color="red.500" mt={1}>
															{errors.resume?.message as string}
														</Text>
													)}
												</>
											);
										}}
									/>

									<Controller
										name="privacyPolicy"
										control={control}
										render={({ field: { onChange, value, ref } }) => (
											<Checkbox.Root
												colorPalette={'blue'}
												checked={value}
												cursor={'pointer'}
												onCheckedChange={(e) => onChange(!!e.checked)}
											>
												<Checkbox.HiddenInput ref={ref} />
												<Checkbox.Control />
												<Checkbox.Label>
													Я ознакомлен с{' '}
													<a
														href={PRIVACY_POLICY_LINK}
														target="_blank"
														rel="noopener noreferrer"
														className={styles.policy}
														onKeyDown={(e) => {
															if (e.key === ' ') {
																e.preventDefault();
																e.stopPropagation();
																window.open(PRIVACY_POLICY_LINK, '_blank');
															}
														}}
													>
														политикой обработки персональных данных
													</a>
												</Checkbox.Label>
											</Checkbox.Root>
										)}
									/>
									{errors.privacyPolicy && (
										<Text textStyle="sm" color="red.500">
											{errors.privacyPolicy.message}
										</Text>
									)}

									<Controller
										name="personalDataConsent"
										control={control}
										render={({ field: { onChange, value, ref } }) => (
											<Checkbox.Root
												colorPalette={'blue'}
												checked={value}
												cursor={'pointer'}
												onCheckedChange={(e) => onChange(!!e.checked)}
											>
												<Checkbox.HiddenInput ref={ref} />
												<Checkbox.Control />
												<Checkbox.Label>
													Я согласен на{' '}
													<a
														href={PERSONAL_DATA_CONSENT_LINK}
														target="_blank"
														rel="noopener noreferrer"
														className={styles.policy}
														onKeyDown={(e) => {
															if (e.key === ' ') {
																e.preventDefault();
																e.stopPropagation();
																window.open(PERSONAL_DATA_CONSENT_LINK, '_blank');
															}
														}}
													>
														обработку персональных данных
													</a>
												</Checkbox.Label>
											</Checkbox.Root>
										)}
									/>
									{errors.personalDataConsent && (
										<Text textStyle="sm" color="red.500">
											{errors.personalDataConsent.message}
										</Text>
									)}

									<Flex justifyContent="center">
										<Button
											mt={4}
											colorPalette="blue"
											bg={'rgba(66, 153, 225, 1)'}
											size="sm"
											loading={sendCodeLoading}
											type="submit"
										>
											Отправить
										</Button>
									</Flex>
								</Stack>
							</form>
						) : (
							<>
								<Text textStyle="sm" fontWeight={500} mb={4}>
									Пожалуйста, введите 4-значный код, отправленный на{' '}
									<strong>{confirmedEmail}</strong>
								</Text>
								<Flex justifyContent="center" mb={3}>
									<PinInput.Root
										value={pinValue}
										onValueChange={(e) => setPinValue(e.value)}
										size="lg"
										autoFocus
										invalid={confirmCodeError}
									>
										<PinInput.HiddenInput />
										<PinInput.Control>
											<PinInput.Input index={0} />
											<PinInput.Input index={1} />
											<PinInput.Input index={2} />
											<PinInput.Input index={3} />
										</PinInput.Control>
									</PinInput.Root>
								</Flex>
								{confirmCodeError && (
									<Text textStyle="sm" textAlign="center" color="red.500" mb={2} mt={2}>
										{confirmCodeErrorText}
									</Text>
								)}
								<Flex justifyContent="center">
									<Button
										mt={4}
										colorPalette="blue"
										bg={'rgba(66, 153, 225, 1)'}
										size="sm"
										onClick={confirmCode}
										loading={confirmCodeLoading}
									>
										Подтвердить
									</Button>
								</Flex>
								<Flex justifyContent="center" alignItems="center" mt={2}>
									<Text textStyle="xs" fontWeight={500}>
										Не получили код?
									</Text>
									<Button
										variant="plain"
										size="xs"
										colorPalette="blue"
										onClick={reSendCode}
										disabled={sendCodeLoading}
										loading={sendCodeLoading}
									>
										Отправить ещё раз
									</Button>
								</Flex>
							</>
						)}
					</div>
				</Stack>
			</div>
		</div>
	);
};
