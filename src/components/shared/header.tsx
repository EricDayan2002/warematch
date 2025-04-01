import { Social, Theme } from "@/widgets"
import { Brand } from "@/ui"

export const Header = () => {
	return (
		<header className="sticky top-0 z-50 w-full border-b border-border/40 bg-blue-50 dark:bg-blue-950 backdrop-blur supports-[backdrop-filter]:bg-blue-50/95 dark:supports-[backdrop-filter]:bg-blue-950/95">
			<div className="container h-14 flex max-w-screen-lg items-center justify-between">
				<Brand />
				<div className="flex items-center">
					<Social />
					<Theme />
				</div>
			</div>
		</header>
	)
}
