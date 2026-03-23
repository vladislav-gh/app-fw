import { PAGES } from "@Shared/config";
import { Link } from "@Shared/ui";

export function Header() {
	return (
		<header className="flex items-center flex-wrap gap-4 font-bold justify-center text-center p-4">
			<Link href={PAGES.home}>Home</Link>
			<Link href={PAGES.signUp}>Sign up</Link>
			<Link href={PAGES.signIn}>Sign In</Link>
			<Link href={PAGES.forgotPassword}>Forgot Password</Link>
			<Link href={PAGES.profile}>Profile</Link>
			<Link href={PAGES.workouts}>Workouts</Link>
			<Link href={PAGES.exercises}>Exercises</Link>
			<Link href={PAGES.exerciseCategories}>Exercise Categories</Link>
		</header>
	);
}
