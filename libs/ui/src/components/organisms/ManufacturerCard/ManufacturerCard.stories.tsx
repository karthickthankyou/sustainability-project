import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ManufacturerCard } from './ManufacturerCard'

export default {
  title: 'src/components/organisms/ManufacturerCard',
  component: ManufacturerCard,
} as ComponentMeta<typeof ManufacturerCard>

const Template: ComponentStory<typeof ManufacturerCard> = (args) => (
  <ManufacturerCard {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
