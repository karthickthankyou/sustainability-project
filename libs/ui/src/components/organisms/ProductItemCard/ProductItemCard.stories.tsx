import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ProductItemCard } from './ProductItemCard'

export default {
  title: 'src/components/organisms/ProductItemCard',
  component: ProductItemCard,
} as ComponentMeta<typeof ProductItemCard>

const Template: ComponentStory<typeof ProductItemCard> = (args) => (
  <ProductItemCard {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
