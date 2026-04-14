// Функция для проверки типа файла
export const isFileTypeValid = (file: File, fileTypes: string[]): boolean => {
    const allowedExtensions = new Set(fileTypes.map((type) => type.toLowerCase()));
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    return !!fileExtension && allowedExtensions.has(fileExtension);
};

// Функция для проверки размера файла
export const isFileSizeValid = (file: File, mbAmount: number): boolean => {
    const maxSizeInBytes = mbAmount * 1024 * 1024; // Переводим МБ в байты
    return file.size <= maxSizeInBytes;
};