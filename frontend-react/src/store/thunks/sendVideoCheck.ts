import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const sendVideoCheck = createAsyncThunk<
  void,
  Blob[],
  { rejectValue: string }
>(
  'interviewFlow/sendVideoCheck',
  async (videoChunks, { rejectWithValue }) => {
    // Helper to convert Blob to Base64
    const convertBlobToBase64 = (blob: Blob): Promise<string> =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          const base64 = result.split(',')[1];
          resolve(base64);
        };
        reader.onerror = () => reject('FileReader error');
        reader.readAsDataURL(blob);
      });

    // Формируем единый Blob из чанков и кодируем в base64
    const videoBlob = new Blob(videoChunks, { type: 'video/mp4' });
    let base64Video: string;
    try {
      base64Video = await convertBlobToBase64(videoBlob);
    } catch (err) {
      console.error('convert video', err);
      return rejectWithValue('Ошибка кодирования видео в Base64');
    }

    // Отправляем на сервер
    try {
      await axios.post(
        '/api/candidates/current_interview/video_check_microphone/',
        {
          media_data: base64Video,
          media_name: 'check_microphone',
          text_checking_microphone: 'Семь раз отмерь, один раз отрежь.',
        }
      );
    } catch (err: any) {
      const msg =
        axios.isAxiosError(err) && err.response
          ? typeof err.response.data === 'string'
            ? err.response.data
            : JSON.stringify(err.response.data)
          : err.message;
          
      return rejectWithValue(msg);
    }
  }
);
