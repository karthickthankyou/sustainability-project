import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { AllProducts } from './AllProducts'

export default {
  title: 'src/components/templates/AllProducts',
  component: AllProducts,
} as ComponentMeta<typeof AllProducts>

const Template: ComponentStory<typeof AllProducts> = (args) => (
  <AllProducts {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
