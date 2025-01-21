export const taskreleaseFormComponents = {
	formId: 'taskrelease',
	title: 'Taskrelease',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill taskrelease title',
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
					value: 'fill taskrelease description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
