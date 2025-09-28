export const taskconfigurationFormComponents = {
	formId: 'taskconfiguration',
	title: 'Taskconfiguration',
	components: [
		{
			name: 'Text',
			key: 'owner',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill configuration owner'
				},
				{
					name: 'Label',
					value: 'owner'
				}
			]
		},
		{
			name: 'Text',
			key: 'repo',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill configuration repo'
				},
				{
					name: 'Label',
					value: 'repo'
				}
			]
		},
		{
			name: 'Text',
			key: 'token',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill configuration token'
				},
				{
					name: 'Label',
					value: 'token'
				}
			]
		}
	]
};
