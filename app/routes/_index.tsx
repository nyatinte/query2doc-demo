import { zodResolver } from '@hookform/resolvers/zod'
import type { MetaFunction } from '@remix-run/cloudflare'
import { Link as RemixLink } from '@remix-run/react'
import {
  ArrowRightIcon,
  CircleHelpIcon,
  ExternalLinkIcon,
  InfoIcon,
  XIcon,
} from 'lucide-react'
import OpenAI from 'openai'
import { useState } from 'react'
import { type SubmitHandler, useForm, useWatch } from 'react-hook-form'
import toast from 'react-hot-toast'
import { css } from 'styled-system/css'
import { Box, Container, Flex, Stack } from 'styled-system/jsx'
import { center, container } from 'styled-system/patterns'
import { z } from 'zod'
import { Badge } from '~/components/ui/Badge'
import { Button } from '~/components/ui/Button'
import { Code } from '~/components/ui/Code'
import * as Dialog from '~/components/ui/Dialog'
import { Heading } from '~/components/ui/Heading'
import { IconButton } from '~/components/ui/IconButton'
import { InputField } from '~/components/ui/InputField'
import { Link } from '~/components/ui/Link'
import { Skeleton } from '~/components/ui/Skeleton'
import * as Tabs from '~/components/ui/Tabs'
import { Text } from '~/components/ui/Text'

export const meta: MetaFunction = () => {
  return [
    { title: 'Query2Doc Demo' },
    { name: 'description', content: 'Query2Doc Unofficial Demo' },
  ]
}

const schema = z.object({
  apiKey: z.string().min(1, 'API Key is required'),
  query: z.string().min(1, 'Query is required'),
})

type FormValues = z.infer<typeof schema>

export default function Index() {
  const tabOptions = [
    { id: 'dense', label: 'Dense' },
    { id: 'sparse', label: 'Sparse' },
  ] as const satisfies readonly { id: string; label: string }[]

  const [pseudoDocument, setPseudoDocument] = useState<string>()
  const [response, setResponse] = useState<string>()
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const client = new OpenAI({
      // WHY: User use each own API key
      dangerouslyAllowBrowser: true,
      apiKey: values.apiKey,
    })

    const completions = await client.chat.completions
      .create({
        model: 'text-davinci-003',
        messages: [
          {
            role: 'user',
            content: `Write a passage that answers the given query:\n\nQuery: ${values.query}\nPassage:`,
          },
        ],
        max_tokens: 128,
        temperature: 1,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })
      .catch((e) => {
        if (e.code === 'invalid_api_key') {
          setError('apiKey', {
            type: 'manual',
            message: 'Invalid API Key',
          })
        }
        return e
      })

    setResponse(JSON.stringify(completions, null, 2))

    if (!completions || !completions?.choices?.[0]?.message?.content) {
      toast.error('Failed to fetch data from OpenAI')
      return
    }
    setPseudoDocument(completions.choices[0].message.content)
  }

  const query = useWatch<FormValues>({ control, name: 'query' })

  return (
    <Container className={css({ paddingY: '4' })}>
      <Stack gap="6">
        <Heading
          as="h1"
          className={css({
            textAlign: 'center',
            fontSize: '3xl',
          })}
        >
          Query2Doc Demo
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap="4" className={container({ minW: '3xl' })}>
            <InputField
              id="api-key"
              label="Open AI API KEY"
              type="password"
              error={errors.apiKey?.message}
              readOnly={isSubmitting || !!pseudoDocument}
              {...register('apiKey')}
              labelIcon={
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <IconButton
                      variant={'ghost'}
                      className={center()}
                      aria-label="Help with API Key"
                    >
                      <CircleHelpIcon />
                    </IconButton>
                  </Dialog.Trigger>
                  <Dialog.Backdrop />
                  <Dialog.Positioner>
                    <Dialog.Content p={4} maxW={'xl'}>
                      <Dialog.Title>API KEY</Dialog.Title>
                      <Dialog.Description>
                        <Text>
                          You need an API key to use this service. The API key
                          is used exclusively for this service, and not stored
                          in any database.
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
                <InputField
                  id="query"
                  label="Query"
                  error={errors.query?.message}
                  spellCheck
                  readOnly={isSubmitting || !!pseudoDocument}
                  {...register('query')}
                />
              </Box>
              <Button type="submit">Expand Query</Button>
            </Flex>
          </Stack>
        </form>
        <Flex gap="4" alignItems="center">
          <div
            className={css({
              height: 'fit-content',
              minHeight: 'md',
              border: '1px solid black',
              padding: '4',
              borderRadius: 'md',
              flex: '1',
              shadow: 'sm',
            })}
          >
            <Flex mb="4" justifyContent="space-between" alignItems="center">
              <Badge variant="outline">Pseudo Document</Badge>
              {response && (
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <IconButton variant={'ghost'} className={center()}>
                      <InfoIcon />
                    </IconButton>
                  </Dialog.Trigger>
                  <Dialog.Backdrop />
                  <Dialog.Positioner>
                    <Dialog.Content p={4} maxW={'xl'}>
                      <Dialog.Title>Response</Dialog.Title>
                      <Dialog.Description>
                        <Code asChild w={'full'} overflow="scroll">
                          <pre>{response}</pre>
                        </Code>
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
              )}
            </Flex>
            {isSubmitting ? (
              <Stack gap="3.5" w="full" animation="fade-in 0.5s ease-in-out">
                {Array.from({ length: 5 }).map((_, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: order is not important
                  <Skeleton key={i} h="4" />
                ))}
              </Stack>
            ) : (
              <Text>{pseudoDocument}</Text>
            )}
          </div>
          <ArrowRightIcon size="32" />
          <div
            className={css({
              height: 'fit-content',
              minHeight: 'md',
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
                  <Tabs.Trigger key={option.id} value={option.id}>
                    {option.label}
                  </Tabs.Trigger>
                ))}
                <Tabs.Indicator />
              </Tabs.List>
              <Tabs.Content value="dense">
                {pseudoDocument && `${query} [SEP] ${pseudoDocument}`}
              </Tabs.Content>
              <Tabs.Content value="sparse">
                {pseudoDocument &&
                  `${Array(5).fill(query).join(' ')} ${pseudoDocument}`}
              </Tabs.Content>
            </Tabs.Root>
          </div>
        </Flex>
        <Link asChild>
          <RemixLink to="https://arxiv.org/abs/2303.07678">
            Read the paper
            <ExternalLinkIcon />
          </RemixLink>
        </Link>
        <Link asChild>
          <RemixLink to="https://github.com/nyatinte">
            Author of the demo
            <ExternalLinkIcon />
          </RemixLink>
        </Link>
      </Stack>
    </Container>
  )
}
