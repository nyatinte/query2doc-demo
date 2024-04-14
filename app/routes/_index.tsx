import type { MetaFunction } from '@remix-run/cloudflare'
import { Link as RemixLink } from '@remix-run/react'
import {
  ArrowRightIcon,
  CircleHelpIcon,
  ExternalLinkIcon,
  XIcon,
} from 'lucide-react'
import { css } from 'styled-system/css'
import { Box, Container, Flex, Stack } from 'styled-system/jsx'
import { center, container } from 'styled-system/patterns'
import { Badge } from '~/components/ui/Badge'
import { Button } from '~/components/ui/Button'
import * as Dialog from '~/components/ui/Dialog'
import { Heading } from '~/components/ui/Heading'
import { Icon } from '~/components/ui/Icon'
import { IconButton } from '~/components/ui/IconButton'
import { InputField } from '~/components/ui/InputField'
import { Link } from '~/components/ui/Link'
import * as Tabs from '~/components/ui/Tabs'
import { Text } from '~/components/ui/Text'

export const meta: MetaFunction = () => {
  return [
    { title: 'Query2Doc Demo' },
    { name: 'description', content: 'Query2Doc Demo' },
  ]
}

export default function Index() {
  const tabOptions = [
    { id: 'dense', label: 'Dense' },
    { id: 'sparse', label: 'Sparse' },
  ] as const satisfies readonly { id: string; label: string }[]

  return (
    <Container className={css({ paddingY: '4' })}>
      <Stack gap="8">
        <Heading
          as="h1"
          className={css({
            textAlign: 'center',
            fontSize: '3xl',
          })}
        >
          Query2Doc Demo
        </Heading>
        <Stack gap="4" className={container({ minW: '3xl' })}>
          <InputField
            id="api-key"
            label="Open AI API KEY"
            type="password"
            labelIcon={
              <Dialog.Root>
                <Dialog.Trigger>
                  <Icon className={center()}>
                    <CircleHelpIcon />
                  </Icon>
                </Dialog.Trigger>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                  <Dialog.Content p={4} maxW={'xl'}>
                    <Dialog.Title>API KEY</Dialog.Title>
                    <Dialog.Description>
                      <Text>
                        You need an API key to use this service. The API key is
                        used exclusively for this service, processed on the
                        backend, and not stored in any database.
                      </Text>
                      <Link mt={4} asChild>
                        <RemixLink to="https://openai.com/">
                          Get your API Key
                          <ExternalLinkIcon />
                        </RemixLink>
                      </Link>
                    </Dialog.Description>
                    <Dialog.CloseTrigger
                      asChild
                      position="absolute"
                      top="2"
                      right="2"
                    >
                      <IconButton
                        aria-label="Close Dialog"
                        variant="ghost"
                        size="sm"
                      >
                        <XIcon />
                      </IconButton>
                    </Dialog.CloseTrigger>
                  </Dialog.Content>
                </Dialog.Positioner>
              </Dialog.Root>
            }
          />
          <Flex gap="4" w="full" alignItems="end">
            <Box flex="1">
              <InputField id="query" label="Query" />
            </Box>
            <Button>Expand Query</Button>
          </Flex>
        </Stack>
        <Flex gap="4" alignItems="center">
          <div
            className={css({
              height: 'fit-content',
              minHeight: 'lg',
              border: '1px solid black',
              padding: '4',
              borderRadius: 'md',
              flex: '1',
              shadow: 'sm',
            })}
          >
            <Badge mb="4" variant="outline">
              Pseudo Document
            </Badge>
            <p>hogehoge</p>
          </div>
          <ArrowRightIcon size="32" />
          <div
            className={css({
              height: 'fit-content',
              minHeight: 'lg',
              border: '1px solid black',
              padding: '4',
              borderRadius: 'md',
              flex: '1',
              shadow: 'sm',
            })}
          >
            <Badge mb="4" variant="outline">
              Expanded Query
            </Badge>
            <Tabs.Root variant="enclosed" defaultValue="dense">
              <Tabs.List>
                {tabOptions.map((option) => (
                  <Tabs.Trigger value={option.id}>{option.label}</Tabs.Trigger>
                ))}
                <Tabs.Indicator />
              </Tabs.List>
              <Tabs.Content value="dense">dense</Tabs.Content>
              <Tabs.Content value="sparse">sparse</Tabs.Content>
            </Tabs.Root>
          </div>
        </Flex>
        <Link asChild>
          <RemixLink to="https://arxiv.org/abs/2303.07678">
            Read the paper
            <ExternalLinkIcon />
          </RemixLink>
        </Link>
      </Stack>
    </Container>
  )
}
