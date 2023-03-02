import { Link, Breadcrumbs, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

type crumbProps = {
	text: string,
	href: any,
	last: boolean
}

function Crumb(props: crumbProps) {
	// The last crumb is rendered as normal text since we are already on the page
	if (props.last) {
		return <Typography color="text.primary">{ props.text }</Typography>;
	}

	// All other crumbs will be rendered as links that can be visited
	return (
		<Link underline="hover" color="inherit" href={ props.href }>
			{ props.text }
		</Link>
	);
}

const MyBreadcrumbs = () => {
	const router = useRouter();

	const breadcrumbs = React.useMemo(function generateBreadcrumbs() {
		const asPathWithoutQuery = router.asPath.split("?")[0];
		const asPathNestedRoutes = asPathWithoutQuery.split("/")
													 .filter(v => v.length > 0);

		const crumblist = asPathNestedRoutes.map((subpath, idx) => {
			const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/");
			return { href, text: subpath };
		})

		return [{ href: "/", text: "Home" }, ...crumblist];
	}, [router.asPath]);

	return (
		<Breadcrumbs aria-label="breadcrumb">
			{
				breadcrumbs.map((crumb, idx) => (
					<Crumb { ...crumb } key={ idx } last={ idx === breadcrumbs.length - 1 }/>))
			}
		</Breadcrumbs>
	);
};

export default MyBreadcrumbs;