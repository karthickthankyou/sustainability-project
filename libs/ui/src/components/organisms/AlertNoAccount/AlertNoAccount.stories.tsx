import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { AlertNoAccount } from './AlertNoAccount'

export default {
  title: 'src/components/organisms/AlertNoAccount',
  component: AlertNoAccount,
} as ComponentMeta<typeof AlertNoAccount>

const Template: ComponentStory<typeof AlertNoAccount> = (args) => (
  <AlertNoAccount {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
