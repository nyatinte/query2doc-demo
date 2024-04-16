import { zodResolver } from '@hookform/resolvers/zod'
import OpenAI from 'openai'
import { useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

const schema = z.object({
  apiKey: z.string().min(1, 'API Key is required'),
  query: z.string().min(1, 'Query is required'),
})

export type UseGPTFormValues = z.infer<typeof schema>

export const useGPTForm = () => {
  const [pseudoDocument, setPseudoDocument] = useState<string>()
  const [response, setResponse] = useState<string>()
  const methods = useForm<UseGPTFormValues>({
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<UseGPTFormValues> = async (values) => {
    const client = new OpenAI({
      // WHY: User use each own API key
      dangerouslyAllowBrowser: true,
      apiKey: values.apiKey,
    })

    const completions = await client.chat.completions
      .create({
        // 現論文ではtext-davinci-003を使用しているが、今はないのでgpt-3.5-turboを使用
        model: 'gpt-3.5-turbo',
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
          methods.setError('apiKey', {
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

  return {
    response,
    pseudoDocument,
    onSubmit,
    ...methods,
  }
}
