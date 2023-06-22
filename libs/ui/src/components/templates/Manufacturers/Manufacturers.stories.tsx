import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Manufacturers } from './Manufacturers'

export default {
  title: 'src/components/templates/Manufacturers',
  component: Manufacturers,
} as ComponentMeta<typeof Manufacturers>

const Template: ComponentStory<typeof Manufacturers> = (args) => (
  <Manufacturers {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
