export const taskmoduleFormComponents = {
	formId: 'taskmodule',
	title: 'Taskmodule',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill taskmodule title',
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
					value: 'fill taskmodule description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
