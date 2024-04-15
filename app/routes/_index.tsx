import { zodResolver } from '@hookform/resolvers/zod'
import type { MetaFunction } from '@remix-run/cloudflare'
import { Link as RemixLink } from '@remix-run/react'
import {
  ArrowRightIcon,
  CircleHelpIcon,
  ExternalLinkIcon,
  XIcon,
} from 'lucide-react'
import { useState } from 'react'
import { type SubmitHandler, useForm, useWatch } from 'react-hook-form'
import { css } from 'styled-system/css'
import { Box, Container, Flex, Stack } from 'styled-system/jsx'
import { center, container } from 'styled-system/patterns'
import { z } from 'zod'
import { Badge } from '~/components/ui/Badge'
import { Button } from '~/components/ui/Button'
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
    { name: 'description', content: 'Query2Doc Demo' },
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
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    console.log(values)
    const response: string = await new Promise((resolve) => {
      setTimeout(() => {
        resolve('hogeohge')
      }, 1000)
    })

    setPseudoDocument(response)
  }

  const query = useWatch<FormValues>({ control, name: 'query' })

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
                    <IconButton variant={'ghost'} className={center()}>
                      <CircleHelpIcon
                        className={css({
                          cursor: 'pointer',
                        })}
                      />
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
      </Stack>
    </Container>
  )
}
