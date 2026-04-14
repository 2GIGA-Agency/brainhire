import { InputMask, InputMaskProps } from '@react-input/mask';
import styles from './style.module.scss';

// Этот компонент нужен только для того, что прописать стили в соответствии с UI приложения, стили в style.module.scss
export default function InputMaskWrapper(props: InputMaskProps) {
	return <InputMask {...props} className={styles.inputMask} />;
}
