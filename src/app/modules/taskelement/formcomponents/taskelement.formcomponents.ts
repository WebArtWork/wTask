export const taskelementFormComponents = {
	formId: 'taskelement',
	title: 'Taskelement',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill taskelement title',
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
					value: 'fill taskelement description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
