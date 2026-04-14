import { useGetCandidateOverviewQuery, useGetPublicCandidateOverviewQuery } from "@/store/rtkQuery/api";
import { Clipboard, IconButton, Input, InputGroup,
    Box, Text, VStack, HStack, Accordion, Tag, Flex,
    Slider, Select, Portal, createListCollection } from "@chakra-ui/react";
import { Typo } from "@/components/shared/Typo/Typo";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import ReactPlayer from "react-player";
import { useState, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { Block } from "@/components/shared/Block";
import { formatDateTime } from "@/utils/formatDate";
import { Tooltip } from "@/components/ui/tooltip";

const ClipboardIconButton = () => {
    return (
        <Clipboard.Trigger asChild>
            <IconButton variant="surface" size="xs" me="-2">
                <Clipboard.Indicator />
            </IconButton>
        </Clipboard.Trigger>
    );
};

interface Props {
    candidateId: string;
    isPublic?: boolean;
}

export function Realtime({ candidateId, isPublic = false }: Props) {
    const { data } = useGetCandidateOverviewQuery({ candidateId }, { skip: isPublic });
    const { data: publicData } = useGetPublicCandidateOverviewQuery({ candidateId }, { skip: !isPublic });
    const interview = (isPublic ? publicData : data)?.realtime_interview;
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
    const dialog = interview?.json_dialog ?? [];

    const mainRef = useRef<ReactPlayer>(null);
    const smallRef = useRef<ReactPlayer>(null);

    const [playing, setPlaying] = useState(false);
    const [played, setPlayed] = useState(0);     // от 0 до 1
    const [volume, setVolume] = useState(1);     // от 0 до 1
    const [muted, setMuted] = useState(false);
    const [duration, setDuration] = useState(0);
    const [playbackRate, setPlaybackRate] = useState(1);

    if (!interview) return null;

    // Публичная версия: всегда показываем статус ожидания до завершения
    if (isPublic && !interview.finished_at) {
        return (
            <Block>
                <Text>Real-time интервью заказано, ожидается прохождение кандидатом.</Text>
            </Block>
        );
    }

    if (interview.url_realtime && !interview.finished_at) {
        return (
            <Clipboard.Root maxW="100%" value={interview.url_realtime}>
                <Clipboard.Label textStyle="label">Ссылка на интервью</Clipboard.Label>
                <InputGroup endElement={<ClipboardIconButton />}>
                    <Clipboard.Input asChild>
                        <Input />
                    </Clipboard.Input>
                </InputGroup>
            </Clipboard.Root>
        );
    }

    if (interview.finished_at) {
        const {
            url_video_candidate,
            url_video_avatar,
            started_at,
            finished_at,
            json_scoring_interview,
            timestamps_realtime_interview,
        } = interview;

        const handleProgress = (state: { played: number }) => {
            setPlayed(state.played);
        };

        const handleSeek = (val: number) => {
            const p = val / 100;
            setPlayed(p);
            mainRef.current?.seekTo(p, "fraction");
            smallRef.current?.seekTo(p, "fraction");
        };

        const handleSeekSeconds = (sec: number) => {
            const safe = Math.max(0, Math.min(sec, duration || 0));
            const p = duration ? safe / duration : 0;
            setPlayed(p);
            mainRef.current?.seekTo(safe, "seconds");
            smallRef.current?.seekTo(safe, "seconds");
        };

        const toggleMute = () => setMuted(m => !m);
        const handleVolume = (val: number) => {
            const v = val / 100;
            setVolume(v);
            if (muted && v > 0) setMuted(false);
        };

        const formatTime = (sec: number) => {
            const m = Math.floor(sec / 60);
            const s = Math.floor(sec % 60).toString().padStart(2, '0');
            return `${m}:${s}`;
        };

        const stageLabel: Record<string, string> = {
            stage_greeting: "Этап приветствие",
            stage_resume: "Этап вопросов по резюме",
            stage_vacancy: "Этап вопросов по вакансии",
            stage_end: "Этап завершение",
            stage_company: "Этап вопросов о компании",
        };

        const scoreBg = (score?: number) => {
            if (typeof score !== "number") return "gray.300";
            return score < 4 ? "red.400" : score < 7 ? "yellow.400" : "green.400";
        };
        const overallBg = (score: number) => (score < 4 ? "red.400" : score < 7 ? "yellow.400" : "green.400");
        const scoring = (json_scoring_interview || {}) as any;
        const rd   = scoring.resume_defense || {};
        const hs   = scoring.hard_skills || {};
        const ss   = scoring.soft_skills || {};
        const mot  = scoring.motivation || {};
        const cf   = scoring.cultural_fit || {};
        const risk = scoring.risk_factors || {};

        const handlePlay = () => setPlaying(true);
        const handlePause = () => setPlaying(false);

        return (
        <VStack align="stretch" spacing={6}>
            {/* Видео-блок */}
            <Block>
                <Box ref={ref} position="relative" pt="56.25%">
                    {inView && (
                    <>
                        <Box
                            position="absolute"
                            top="50%"
                            left="50%"
                            transform="translate(-50%, -50%)"
                            width="100%"
                            overflow="hidden"
                            borderRadius="8px"
                            onClick={() => setPlaying(p => !p)}
                            cursor="pointer"
                            aria-label={playing ? 'Пауза видео' : 'Воспроизвести видео'}
                            role="button"
                        >
                            <ReactPlayer
                                ref={mainRef}
                                url={url_video_avatar!}
                                playing={playing}
                                controls={false}
                                width="100%"
                                height="100%"
                                volume={volume}
                                muted={muted}
                                playbackRate={playbackRate}
                                onProgress={handleProgress}
                                onPlay={handlePlay}
                                onPause={handlePause}
                                onDuration={setDuration}
                            />
                        </Box>

                        <Box
                            position="absolute"
                            top="16px"
                            right="16px"
                            width="33%"
                            borderRadius="10px"
                            overflow="hidden"
                            pointerEvents="none"
                            >
                            <ReactPlayer
                                ref={smallRef}
                                url={url_video_candidate!}
                                playing={playing}
                                controls={false}
                                width="100%"
                                height="100%"
                                volume={volume}
                                muted={muted}
                                playbackRate={playbackRate}
                            />
                        </Box>
                    </>
                    )}
                </Box>
                {/* общие контролы */}
                <Flex align="center" mt={4} gap={4}>
                    {/* Play / Pause */}
                    <IconButton
                        aria-label={playing ? "Pause" : "Play"}
                        onClick={() => setPlaying(p => !p)}
                    >
                        {playing ? <FaPause /> : <FaPlay />}
                    </IconButton>

                    {/* Текущее время */}
                    <Text whiteSpace="nowrap" fontSize="sm" width="60px">
                        {formatTime(played * duration)}
                    </Text>

                    {/* Слайдер прогресса + маркеры этапов */}
                    <Box position="relative" width="100%">
                        <Slider.Root
                            width="100%"
                            value={[played * 100]}
                            onValueChange={({ value }) => handleSeek(value)}
                        >
                            <Slider.Control position="relative">
                                <Slider.Track>
                                    <Slider.Range />
                                </Slider.Track>
                                <Slider.Thumbs />

                                {/* Маркеры этапов поверх дорожки */}
                                <Box position="absolute" inset={0} pointerEvents="none">
                                    {(timestamps_realtime_interview || [])
                                        .slice()
                                        .sort((a: any, b: any) => (a?.elapsed ?? 0) - (b?.elapsed ?? 0))
                                        .map((t: any, idx: number) => {
                                            const pos = duration ? (Math.min(Math.max(t?.elapsed || 0, 0), duration) / duration) * 100 : 0;
                                            const label = stageLabel[t?.tag] || t?.tag || `Этап ${idx + 1}`;
                                            return (
                                                <Tooltip key={`${t?.tag}-${idx}`}
                                                    content={`${formatTime(t?.elapsed || 0)} • ${label}`}
                                                    contentProps={{ p: 2 }}
                                                >
                                                    <Box
                                                        position="absolute"
                                                        left={`${pos}%`}
                                                        top="50%"
                                                        transform="translate(-50%, -50%)"
                                                        width="2px"
                                                        height="16px"
                                                        bg="blue.400"
                                                        borderRadius="full"
                                                        boxShadow="0 0 0 1px rgba(0,0,0,0.05)"
                                                        cursor="pointer"
                                                        pointerEvents="auto"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleSeekSeconds(t?.elapsed || 0);
                                                        }}
                                                        aria-label={`Перейти к этапу: ${label}`}
                                                    />
                                                </Tooltip>
                                            );
                                        })}
                                </Box>
                            </Slider.Control>
                        </Slider.Root>
                    </Box>

                    {/* Общая длительность */}
                    <Text whiteSpace="nowrap" fontSize="sm" width="60px">
                        {formatTime(duration)}
                    </Text>

                    {/* Mute / Volume */}
                    <IconButton
                        aria-label={muted ? "Unmute" : "Mute"}
                        onClick={toggleMute}
                    >
                        {muted ? <FaVolumeMute /> : <FaVolumeUp />}
                    </IconButton>
                    <Slider.Root
                        w="100px"
                        value={[muted ? 0 : volume * 100]}
                        onValueChange={({ value }) => handleVolume(value)}
                        >
                        <Slider.Control>
                            <Slider.Track>
                                <Slider.Range />
                            </Slider.Track>
                            <Slider.Thumbs />
                        </Slider.Control>
                    </Slider.Root>

                    {/* Playback speed (dropdown) */}
                    {(() => {
                        const speedOptions = createListCollection({
                            items: [
                                { label: '0.5x', value: '0.5' },
                                { label: '1x', value: '1' },
                                { label: '1.25x', value: '1.25' },
                                { label: '1.5x', value: '1.5' },
                                { label: '2x', value: '2' },
                            ],
                        });
                        return (
                            <Select.Root
                                w="80px"
                                collection={speedOptions}
                                value={[String(playbackRate)]}
                                multiple={false}
                                onValueChange={({ value }) => {
                                    const v = parseFloat(value[0]);
                                    if (!Number.isNaN(v)) setPlaybackRate(v);
                                }}
                            >
                                <Select.HiddenSelect />
                                <Select.Control minW="70px" width="70px">
                                    <Select.Trigger paddingLeft={'8px'} paddingRight={'8px'} cursor={'pointer'}>
                                        <Select.ValueText placeholder="Скорость" />
                                    </Select.Trigger>
                                    <Select.IndicatorGroup paddingRight={'6px'}>
                                        <Select.Indicator />
                                    </Select.IndicatorGroup>
                                </Select.Control>
                                <Portal>
                                    <Select.Positioner>
                                        <Select.Content>
                                            {speedOptions.items.map((item) => (
                                                <Select.Item item={item} key={item.value} padding="8px" cursor={'pointer'}>
                                                    {item.label}
                                                    <Select.ItemIndicator />
                                                </Select.Item>
                                            ))}
                                        </Select.Content>
                                    </Select.Positioner>
                                </Portal>
                            </Select.Root>
                        );
                    })()}
                </Flex>
            </Block>

            {/* Даты */}
            <Block>
                <VStack align="stretch" spacing={3}>
                    <HStack spacing={4}>
                        <Text>
                            <Text as="span" fontWeight="semibold">Начало: </Text>
                            {formatDateTime(started_at)}
                        </Text>
                        <Text>
                            <Text as="span" fontWeight="semibold">Окончание: </Text>
                            {formatDateTime(finished_at)}
                        </Text>
                    </HStack>

                    {/* Временные метки этапов */}
                    {Array.isArray(timestamps_realtime_interview) && timestamps_realtime_interview.length > 0 && (
                        <VStack align="stretch" spacing={2}>
                            <Text fontWeight="semibold">Этапы интервью</Text>
                            <VStack align="stretch" spacing={1}>
                                {timestamps_realtime_interview
                                    .slice()
                                    .sort((a: any, b: any) => (a?.elapsed ?? 0) - (b?.elapsed ?? 0))
                                    .map((t: any, idx: number) => {
                                        const label = stageLabel[t?.tag] || t?.tag || `Этап ${idx + 1}`;
                                        const sec = Math.max(0, t?.elapsed || 0);
                                        return (
                                            <HStack key={`${t?.tag}-${idx}`} spacing={3}>
                                                <Text
                                                    as="button"
                                                    onClick={() => handleSeekSeconds(sec)}
                                                    color="blue.600"
                                                    _hover={{ textDecoration: 'underline' }}
                                                    cursor="pointer"
                                                    minW="56px"
                                                    textAlign="left"
                                                >
                                                    {formatTime(sec)}
                                                </Text>
                                                <Text>{label}</Text>
                                            </HStack>
                                        );
                                    })}
                            </VStack>
                        </VStack>
                    )}
                </VStack>
            </Block>

            {/* — аккордеон */}
            <Block>
                <Accordion.Root collapsible w="100%" variant="plain">
                    {/* Оценка */}
                    <Accordion.Item value="scoring" w="100%" mb={4}>
                        <Accordion.ItemTrigger
                            w="100%"
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            bg="gray.50"
                            pl={2} pr={2}
                        >
                            {(() => {
                                const clamp = (n: number) => Math.max(0, Math.min(10, n));
                                const rds = typeof rd.score === 'number' ? rd.score : 0;
                                const hss = typeof hs.score === 'number' ? hs.score : 0;
                                const sss = typeof ss.score === 'number' ? ss.score : 0;
                                const anyProvided = [rd.score, hs.score, ss.score].some(v => typeof v === 'number');
                                const overall = clamp(0.4 * rds + 0.4 * hss + 0.2 * sss);
                                return (
                                    <HStack gap={2}>
                                        <Text as="span" p={1}>Оценка интервью</Text>
                                        {anyProvided && (
                                            <Typo
                                                color="#fff"
                                                padding="2px 8px"
                                                weight="medium"
                                                borderRadius="6px"
                                                size="12px"
                                                lineHeight="24px"
                                                bgColor={overallBg(overall)}
                                            >
                                                {overall.toFixed(1)}
                                            </Typo>
                                        )}
                                    </HStack>
                                );
                            })()}
                            <Accordion.ItemIndicator />
                        </Accordion.ItemTrigger>
                        <Accordion.ItemContent p={4}>
                            <VStack align="stretch" spacing={4}>
                                {/* 1. Пояснение */}
                                <Box>
                                <Text fontWeight="semibold" mb={2}>Пояснение</Text>
                                <Text whiteSpace="pre-wrap">
                                    {scoring.recruiter_conclusion || "—"}
                                </Text>
                                </Box>

                                {/* 2. Защита резюме */}
                                <Box>
                                <HStack spacing={2} mb={2}>
                                    <Text fontWeight="semibold">Защита резюме</Text>
                                    {typeof rd.score === "number" && (
                                    <Tag.Root borderRadius="6px" bgColor={scoreBg(rd.score)} border="none">
                                        &nbsp;&nbsp;
                                    </Tag.Root>
                                    )}
                                </HStack>
                                <Text whiteSpace="pre-wrap">
                                    {rd.rationale || "—"}
                                </Text>
                                </Box>

                                {/* 3. Профессиональные навыки */}
                                <Box>
                                <HStack spacing={2} mb={2}>
                                    <Text fontWeight="semibold">Профессиональные навыки</Text>
                                    {typeof hs.score === "number" && (
                                    <Tag.Root borderRadius="6px" bgColor={scoreBg(hs.score)} border="none">
                                        &nbsp;&nbsp;
                                    </Tag.Root>
                                    )}
                                </HStack>
                                <Text whiteSpace="pre-wrap">
                                    {hs.rationale || "—"}
                                </Text>
                                </Box>

                                {/* 4. Гибкие навыки */}
                                <Box>
                                <HStack spacing={2} mb={2}>
                                    <Text fontWeight="semibold">Гибкие навыки</Text>
                                    {typeof ss.score === "number" && (
                                    <Tag.Root borderRadius="6px" bgColor={scoreBg(ss.score)} border="none">
                                        &nbsp;&nbsp;
                                    </Tag.Root>
                                    )}
                                </HStack>
                                <Text whiteSpace="pre-wrap">
                                    {ss.rationale || "—"}
                                </Text>
                                </Box>

                                {/* 5. Мотивация */}
                                <Box>
                                <Text fontWeight="semibold" mb={2}>Мотивация</Text>
                                <Text whiteSpace="pre-wrap">
                                    {mot.description || "—"}
                                </Text>
                                </Box>

                                {/* 6. Культурное соответствие */}
                                <Box>
                                <Text fontWeight="semibold" mb={2}>Культурное соответствие</Text>
                                <Text whiteSpace="pre-wrap">
                                    {cf.description || "—"}
                                </Text>
                                </Box>

                                {/* 7. Риски */}
                                <Box>
                                <Text fontWeight="semibold" mb={2}>Риски</Text>
                                <Text whiteSpace="pre-wrap">
                                    {(risk && risk.description) || "—"}
                                </Text>
                                </Box>
                            </VStack>
                        </Accordion.ItemContent>
                    </Accordion.Item>

                    {/* Транскрипт */}
                    <Accordion.Item value="transcript" w="100%" mb={4}>
                        <Accordion.ItemTrigger 
                            w="100%" 
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            bg="gray.50"
                            pl={2} pr={2}
                        >
                            <Text as="span" p={1}>Транскрипт интервью</Text>
                            <Accordion.ItemIndicator />
                        </Accordion.ItemTrigger>
                        <Accordion.ItemContent p={4}>
                            {dialog.map((item, idx) => (
                            <Box key={idx} mb={4}>
                                {item.question || item.answer ? (
                                    <>
                                        <Tag.Root size="sm" mb={1}>Интервьюер</Tag.Root>
                                        <Text mb={2}>{item.question}</Text>
                                        {item.answer ? (
                                            <>
                                                <Tag.Root size="sm" mb={1}>Кандидат</Tag.Root>
                                                <Text>{item.answer}</Text>
                                                <Box borderBottom="1px solid" borderColor="gray.200" my={3} />
                                            </>
                                        ): null}
                                    </>
                                ) : item.stage ? (
                                    <>
                                        <Tag.Root
                                            size="sm" mb={1} p={1}
                                            borderRadius="md"
                                            display="flex"
                                            justifyContent="center"
                                        >
                                            {item.stage}
                                        </Tag.Root>
                                    </>
                                ) : null}
                            </Box>
                            ))}
                        </Accordion.ItemContent>
                    </Accordion.Item>
                </Accordion.Root>
            </Block>
        </VStack>
        );
    }

    return null;
}
