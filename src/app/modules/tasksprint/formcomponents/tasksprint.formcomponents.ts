export const tasksprintFormComponents = {
	formId: 'tasksprint',
	title: 'Tasksprint',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill tasksprint title',
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
					value: 'fill tasksprint description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
