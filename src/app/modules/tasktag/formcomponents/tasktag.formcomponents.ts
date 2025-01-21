export const tasktagFormComponents = {
	formId: 'tasktag',
	title: 'Tasktag',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill tasktag title',
				},
				{
					name: 'Label',
					value: 'Title',
				}
			]
		},
		{
			name: 'Text',
			key: 'description',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill tasktag description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
