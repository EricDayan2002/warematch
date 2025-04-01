import Link from "next/link"

export function Brand() {
	return (
		<Link href="/" className="flex items-center">
			<span className="text-2xl font-bold text-blue-900 dark:text-blue-100">WAREMATCH</span>
		</Link>
	)
}
