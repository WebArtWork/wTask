export const taskstoryFormComponents = {
	formId: 'taskstory',
	title: 'Taskstory',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill taskstory title',
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
					value: 'fill taskstory description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
