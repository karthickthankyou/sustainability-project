import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { SellItem } from './SellItem'

export default {
  title: 'src/components/templates/SellItem',
  component: SellItem,
} as ComponentMeta<typeof SellItem>

const Template: ComponentStory<typeof SellItem> = (args) => (
  <SellItem {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
