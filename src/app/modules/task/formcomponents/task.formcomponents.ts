export const taskFormComponents = {
	formId: 'task',
	title: 'Task',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill task title',
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
					value: 'fill task description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
