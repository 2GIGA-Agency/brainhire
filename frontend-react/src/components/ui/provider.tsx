"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode"

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={defaultSystem}>
      {/* false - по умолчанию светлая тема */}
      <ColorModeProvider {...props} enableSystem={false} defaultTheme="light" />
    </ChakraProvider>
  )
}
