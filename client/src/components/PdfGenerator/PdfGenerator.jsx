// PdfGenerator.js
import React from 'react'
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import SalesTemplate from '../../templates/SalesTemplate'

const PdfGenerator = ({ data }) => {
	const date = data.shift()

	const fileName = `Report_${date.start}-${date.end}.pdf`

	return (
		<PDFDownloadLink document={<SalesTemplate data={data} />}>
			{({ blob, url, loading, error }) => {
				if (loading) {
					return <p>Loading document...</p>
				}
				return (
					<a href={url} download='raport.pdf' className='pdf-download'>
						Download a PDF report
					</a>
				)
			}}
		</PDFDownloadLink>
	)
}

export default PdfGenerator
