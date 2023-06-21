import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ReturnItem } from './ReturnItem'

export default {
  title: 'src/components/templates/ReturnItem',
  component: ReturnItem,
} as ComponentMeta<typeof ReturnItem>

const Template: ComponentStory<typeof ReturnItem> = (args) => (
  <ReturnItem {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
