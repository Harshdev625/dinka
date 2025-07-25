import React from 'react'
import CreatePost from './Posts/CreatePost'
export default function footer({ addpost, setIsLoading }: any) {
    return (
        <footer className="w-full fixed bottom-0 bg-zinc-100/80 backdrop-blur-md backdrop-saturate-[1.8] z-30 pb-3 pt-1">
            <div className="flex w-full items-center justify-center surface-nav-element pointer-events-auto">
                <div className="flex h-[3.375rem] cursor-pointer items-center gap-[10px] rounded-full px-[10px] sm:gap-[2vw]">
                    <a className="relative flex h-full items-center gap-1.5 rounded-full px-4 hover:opacity-100 tablet:pl-3 opacity-100" href="/explore">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 28 28" className="h-7 w-7">
                            <path fill="currentColor" d="M11.778 17.507V12.66a.903.903 0 0 1 1.391-.764l3.75 2.423a.91.91 0 0 1 0 1.528l-3.75 2.424a.903.903 0 0 1-1.391-.764">
                            </path>
                            <path stroke="currentColor" strokeWidth="2.33" d="M24 15.676v-1.992c0-1.683 0-2.526-.239-3.285a5.2 5.2 0 0 0-1.016-1.827c-.519-.603-1.234-1.047-2.665-1.936l-1.704-1.058c-1.588-.986-2.382-1.479-3.233-1.671a5.2 5.2 0 0 0-2.286 0c-.851.192-1.645.685-3.233 1.671L7.92 6.636c-1.43.889-2.146 1.333-2.665 1.936a5.2 5.2 0 0 0-1.016 1.827C4 11.16 4 12.001 4 13.685v1.991c0 2.904 0 4.356.565 5.465a5.2 5.2 0 0 0 2.266 2.266c1.11.565 2.561.565 5.465.565h3.408c2.904 0 4.356 0 5.465-.565a5.2 5.2 0 0 0 2.266-2.266C24 20.031 24 18.58 24 15.676Z">
                            </path>
                        </svg>
                        <span className="sr-only">Explore</span></a>
                    <a className="relative flex h-full items-center gap-1.5 rounded-full px-4 opacity-50 hover:opacity-100 tablet:pl-3" href="/library">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" className="h-7 w-7"><path fill="currentColor" d="M16.679 4.371a1 1 0 0 0-1.857-.742zM12.822 8.63a1 1 0 0 0 1.857.742zM11.179 4.37a1 1 0 0 0-1.857-.742zM7.321 8.63a1 1 0 0 0 1.856.742zM6.184 19.564l.454-.891zm-1.748-1.748.891-.454zm15.128 0-.891-.454zm-1.748 1.748-.454-.891zm0-15.128-.454.891zm1.748 1.748-.891.454zM6.184 4.436l.454.891zM4.436 6.184l.891.454zM20 8H4v2h16zm-5.178-4.371-2 5 1.857.742 2-5zm-5.5 0-2 5 1.856.742 2-5zM10.4 5h3.2V3h-3.2zm8.6 5.4v3.2h2v-3.2zM13.6 19h-3.2v2h3.2zM5 13.6v-3.2H3v3.2zm5.4 5.4c-1.137 0-1.929 0-2.546-.051-.605-.05-.953-.142-1.216-.276l-.908 1.782c.592.302 1.233.428 1.961.487.718.059 1.605.058 2.709.058zM3 13.6c0 1.104 0 1.991.058 2.709.06.729.185 1.369.487 1.961l1.782-.908c-.134-.263-.226-.611-.276-1.216C5.001 15.529 5 14.736 5 13.6zm3.638 5.073a3 3 0 0 1-1.311-1.311l-1.782.908a5 5 0 0 0 2.185 2.185zM19 13.6c0 1.137 0 1.929-.051 2.546-.05.605-.142.953-.276 1.216l1.782.908c.302-.592.428-1.232.487-1.961.059-.718.058-1.605.058-2.709zM13.6 21c1.104 0 1.991 0 2.709-.058.729-.06 1.369-.185 1.961-.487l-.908-1.782c-.263.134-.611.226-1.216.276-.617.05-1.41.051-2.546.051zm5.073-3.638a3 3 0 0 1-1.311 1.311l.908 1.782a5 5 0 0 0 2.185-2.185zM13.6 5c1.137 0 1.929 0 2.546.051.605.05.953.142 1.216.276l.908-1.782c-.592-.302-1.232-.428-1.961-.487C15.59 2.999 14.704 3 13.6 3zm7.4 5.4c0-1.104 0-1.991-.058-2.709-.06-.728-.185-1.369-.487-1.96l-1.782.907c.134.263.226.611.276 1.216.05.617.051 1.41.051 2.546zm-3.638-5.073a3 3 0 0 1 1.311 1.311l1.782-.908a5 5 0 0 0-2.185-2.185zM10.4 3c-1.104 0-1.991 0-2.709.058-.728.06-1.369.185-1.96.487l.907 1.782c.263-.134.611-.226 1.216-.276C8.471 5.001 9.264 5 10.4 5zM5 10.4c0-1.137 0-1.929.051-2.546.05-.605.142-.953.276-1.216L3.545 5.73c-.302.592-.428 1.233-.487 1.961C2.999 8.41 3 9.296 3 10.4zm.73-6.855A5 5 0 0 0 3.545 5.73l1.782.908a3 3 0 0 1 1.311-1.311z">
                        </path></svg><span className="sr-only">Library</span></a>

                    <div className="relative flex h-full items-center gap-1.5 rounded-full opacity-50 hover:opacity-100 tablet:pl-3 px-1.5 py-2">
                        <CreatePost addpost={addpost} setIsLoading={setIsLoading} />
                    </div>


                    <a className="relative flex h-full items-center gap-1.5 rounded-full px-4 opacity-50 hover:opacity-100 tablet:pl-3" href="/activity">
                        <div className="relative flex h-7 w-7 items-center justify-center tablet:h-6 tablet:w-6">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" className="h-full w-full"><path fill="currentColor" fillRule="evenodd" d="M3.8 9.603a8.248 8.248 0 0 1 16.399 0l.674 6.18A2 2 0 0 1 18.885 18h-2.043a5.002 5.002 0 0 1-9.685 0H5.115a2 2 0 0 1-1.988-2.217zM9.273 18a3 3 0 0 0 5.456 0zM12 4.25a6.25 6.25 0 0 0-6.21 5.57L5.114 16h13.77l-.674-6.18A6.25 6.25 0 0 0 12 4.25" clipRule="evenodd"></path>
                            </svg></div><span className="sr-only">Activity</span></a><button className="relative flex h-full items-center gap-1.5 rounded-full px-4 hover:opacity-100 tablet:pl-3 opacity-100">
                        <div className="">
                            <div className="flex items-center" id="radix-:r9g:" aria-haspopup="menu" aria-expanded="false" data-state="closed">
                                <img src="https://lh3.googleusercontent.com/a/ACg8ocLgpKdvLVOpp8SAZuTsTAb3O-MWAPgYOnESGbYVWwWs9ce7j1P8=s96-c" alt="" className="rounded-full h-6 w-6" /></div>
                        </div></button>   </div>
            </div>
        </footer>
    )
}
