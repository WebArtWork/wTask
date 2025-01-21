export const taskpageFormComponents = {
	formId: 'taskpage',
	title: 'Taskpage',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill taskpage title',
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
					value: 'fill taskpage description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
