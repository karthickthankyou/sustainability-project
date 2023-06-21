import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ProductCard } from './ProductCard'

export default {
  title: 'src/components/organisms/ProductCard',
  component: ProductCard,
} as ComponentMeta<typeof ProductCard>

const Template: ComponentStory<typeof ProductCard> = (args) => (
  <ProductCard {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
