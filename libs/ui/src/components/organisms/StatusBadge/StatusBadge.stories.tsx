import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { StatusBadge } from './StatusBadge'

export default {
  title: 'src/components/organisms/StatusBadge',
  component: StatusBadge,
} as ComponentMeta<typeof StatusBadge>

const Template: ComponentStory<typeof StatusBadge> = (args) => (
  <StatusBadge {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
