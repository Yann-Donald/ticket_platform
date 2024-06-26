const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex-center min-h-screen w-full bg-dotted-pattern bg-fixed bg-cover bg-center">
            {children}
        </div>
    )
}

export default Layout;