export const taskprojectFormComponents = {
	formId: 'taskproject',
	title: 'Taskproject',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill project title',
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
					value: 'fill project description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
