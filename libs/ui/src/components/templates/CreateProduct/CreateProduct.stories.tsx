import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { CreateProduct } from './CreateProduct'

export default {
  title: 'src/components/templates/CreateProduct',
  component: CreateProduct,
} as ComponentMeta<typeof CreateProduct>

const Template: ComponentStory<typeof CreateProduct> = (args) => (
  <CreateProduct {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
