import { FC, useState } from 'react'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import { useProvider } from 'wagmi'

const Home: FC = () => {
	const provider = useProvider({ chainId: 1 })
	const [ens, setEns] = useState('')
	const [results, setResults] = useState([])
	const [loading, setLoading] = useState(false)
	const [progress, setProgress] = useState(0)

	const handleClick = async () => {
		if (loading) return
		setResults([])
		setProgress(0)
		setLoading(true)
		console.log('ENS', ens)
		let ensList = ens.split(/\r?\n/)
		ensList = ensList.filter((e) => e)
		console.log('ensList', ensList)
		const newResults = []
		for (let i = 0; i < ensList.length; i++) {
		var address = await provider.resolveName(ensList[i])
		console.log('index', i)
		console.log('ENS', ensList[i])
		console.log('address', address)
		newResults.push(address)
		setProgress(Math.round((i / ensList.length) * 100))
		}
		setResults(newResults)
		setLoading(false)
	}

	return (
		<div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center py-4 sm:pt-0">
			<ThemeSwitcher className="absolute bottom-6 right-6" />
			<div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
				<div className="flex justify-center pt-8 sm:justify-start sm:pt-0">
					<h1 className="text-6xl font-bold dark:text-white">ENS Bulk Resolve</h1>
				</div>

				<textarea onChange={(e) => setEns(e.target.value)} id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>

				<div className="flex justify-center mt-4 sm:items-center sm:justify-between">
					<div className="text-center text-sm text-gray-500 sm:text-left">
						<button onClick={handleClick} type="button" className="flex flex-row items-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
							{loading ? (
								<>
									<div role="status">
										<svg aria-hidden="true" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
											<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
										</svg>
										<span className="sr-only">Loading...</span>
									</div> <p className="ml-1 font-bold" >{progress} %</p>
								</>
							) : (
							'Generate'
							)}
						</button>
						<div className="flex items-center">
						
							<p className="ml-1">
								results
								{results.map((address) => (
									<p key={address}>
										{address}
									</p>
								))}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Home
