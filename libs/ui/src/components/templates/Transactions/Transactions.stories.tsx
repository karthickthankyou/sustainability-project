import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Transactions } from './Transactions'

export default {
  title: 'src/components/templates/Transactions',
  component: Transactions,
} as ComponentMeta<typeof Transactions>

const Template: ComponentStory<typeof Transactions> = (args) => (
  <Transactions {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
