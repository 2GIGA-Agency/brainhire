import { Avatar } from "@chakra-ui/react";

export function VideoAvatar() {
    return (
        <Avatar.Root width={20}>
            <Avatar.Fallback name="A I" />
            <Avatar.Image src="/images/ai_head.png" />
        </Avatar.Root>
    )
}