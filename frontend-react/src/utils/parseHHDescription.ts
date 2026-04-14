// /brain/frontend-react/src/utils/parseHHDescription.ts

export const parseHHDescription = (html: string) => {
    const result = {
        responsibilities: '',
        requirements: '',
        conditions: '',
    };

    if (!html) return result;

    // Ключевые слова для каждого типа секции (в нижнем регистре)
    const keywords = {
        responsibilities: [
            'обязанности',
            'должностные обязанности',
            'чем предстоит заниматься',
            'что нужно делать',
            'задачи',
            'ключевые задачи',
            'функционал',
            'основные обязанности',
        ],
        requirements: [
            'требования',
            'необходимые навыки',
            'квалификационные требования',
            'что нужно знать',
            'требования к кандидату',
            'требования к опыту',
            'мы ждем от вас',
            'навыки',
            'что необходимо',
        ],
        conditions: [
            'условия',
            'мы предлагаем',
            'условия работы',
            'что мы предлагаем',
            'преимущества',
            'бонусы',
            'компенсация',
            'график работы',
            'оформление',
            'рабочие условия',
        ],
    };

    // Функция для очистки HTML от тегов, но с сохранением переносов строк
    const cleanHTML = (text: string): string => {
        let cleaned = text.replace(/<br\s*\/?>/gi, '\n'); // <br> -> \n
        cleaned = cleaned.replace(/<[^>]+>/g, '');        // удаляем все остальные теги
        cleaned = cleaned.replace(/\n\s*\n/g, '\n\n');    // убираем лишние пустые строки
        cleaned = cleaned.trim();
        return cleaned;
    };

    // Поиск всех заголовков в HTML (теги strong, b, h1-h6)
    const headingRegex = /<(strong|b|h[1-6])(?:\s[^>]*)?>(.*?)<\/\1>/gi;
    const headings: { tag: string; content: string; start: number; end: number; type: keyof typeof result | null }[] = [];

    let match: RegExpExecArray | null;
    while ((match = headingRegex.exec(html)) !== null) {
        const fullMatch = match[0];
        const tag = match[1];
        const inner = match[2];
        const start = match.index;
        const end = start + fullMatch.length;
        const innerText = inner.replace(/<[^>]+>/g, '').toLowerCase().replace(/[:\s]+$/, '');

        let detectedType: keyof typeof result | null = null;
        for (const [type, words] of Object.entries(keywords)) {
            if (words.some(word => innerText.includes(word))) {
                detectedType = type as keyof typeof result;
                break;
            }
        }

        if (detectedType) {
            headings.push({ tag, content: inner, start, end, type: detectedType });
        }
    }

    // Сортируем заголовки по позиции в строке
    headings.sort((a, b) => a.start - b.start);

    // Если нет ни одного заголовка, весь текст помещаем в responsibilities
    if (headings.length === 0) {
        result.responsibilities = cleanHTML(html);
        return result;
    }

    // Функция для извлечения текста между двумя позициями
    const extractBetween = (startPos: number, endPos: number): string => {
        if (startPos >= endPos) return '';
        const sectionHtml = html.substring(startPos, endPos);
        return cleanHTML(sectionHtml);
    };

    // Извлекаем текст для каждого найденного заголовка
    for (let i = 0; i < headings.length; i++) {
        const heading = headings[i];
        const startPos = heading.end;
        const endPos = i + 1 < headings.length ? headings[i + 1].start : html.length;
        const sectionText = extractBetween(startPos, endPos);
        if (heading.type) {
            result[heading.type] = sectionText;
        }
    }

    // Дополнительно очищаем каждую секцию от лишних пробелов
    for (const key of Object.keys(result) as (keyof typeof result)[]) {
        result[key] = result[key].trim();
    }

    return result;
};