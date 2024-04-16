import {
  ArrowRightIcon,
  CircleHelpIcon,
  ExternalLinkIcon,
  InfoIcon,
  XIcon,
} from 'lucide-react'
import { useWatch } from 'react-hook-form'
import { Box, Container, Flex, Stack } from 'styled-system/jsx'
import { center, container } from 'styled-system/patterns'
import { BadgeCard } from '~/components/ui/BadgeCard'
import { Button } from '~/components/ui/Button'
import { Code } from '~/components/ui/Code'
import * as Dialog from '~/components/ui/Dialog'
import { Heading } from '~/components/ui/Heading'
import { IconButton } from '~/components/ui/IconButton'
import { InputField } from '~/components/ui/InputField'
import { Link } from '~/components/ui/Link'
import { Skeleton } from '~/components/ui/Skeleton'
import { Text } from '~/components/ui/Text'
import { QueryTab } from '~/feature/components/QueryTab'
import {
  type UseGPTFormValues,
  useGPTForm,
} from '~/feature/index/utils/useGPTForm'

export const IndexPage = () => {
  const {
    register,
    formState: { isSubmitting, errors },
    control,
    handleSubmit,
    onSubmit,
    pseudoDocument,
    response,
  } = useGPTForm()

  const query = useWatch<UseGPTFormValues>({ control, name: 'query' })

  return (
    <Container py="4">
      <Stack gap="6">
        <Heading as="h1" textAlign="center" fontSize="3xl">
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
                    <Dialog.Content p="4" maxW="xl">
                      <Dialog.Title>API KEY</Dialog.Title>
                      <Dialog.Description>
                        <Text>
                          You need an API key to use this service. The API key
                          is used exclusively for this service, and not stored
                          in any database.
                        </Text>
                        <Link mt="4" to="https://openai.com/">
                          Get your API Key
                          <ExternalLinkIcon />
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
          <BadgeCard
            label="Pseudo Document"
            badgeRightIcon={
              response && (
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <IconButton
                      aria-label="Response Info"
                      variant={'ghost'}
                      className={center()}
                    >
                      <InfoIcon />
                    </IconButton>
                  </Dialog.Trigger>
                  <Dialog.Backdrop />
                  <Dialog.Positioner>
                    <Dialog.Content p={4} maxW={'xl'}>
                      <Dialog.Title>Response</Dialog.Title>
                      <Dialog.Description>
                        <Text>
                          The original paper uses the text-davinci-003 model,
                          but it is not available now. Instead, the
                          gpt-3.5-turbo model is used.
                        </Text>
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
              )
            }
          >
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
          </BadgeCard>

          <ArrowRightIcon size="32" />
          <BadgeCard label="Expanded Query">
            <QueryTab query={query} pseudoDocument={pseudoDocument} />
          </BadgeCard>
        </Flex>
        <Link to="https://arxiv.org/abs/2303.07678">
          Read the paper
          <ExternalLinkIcon />
        </Link>
        <Link to="https://github.com/nyatinte">
          Author of the demo
          <ExternalLinkIcon />
        </Link>
      </Stack>
    </Container>
  )
}
