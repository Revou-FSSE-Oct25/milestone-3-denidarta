import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "api.escuelajs.co", // Also allow images from the API if they are directly hosted there
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "picsum.photos",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "imgur.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "i.imgur.com",
				port: "",
				pathname: "/**",
			},{
				protocol: "https",
				hostname: "placeimg.com",
				port: "",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
