'use client'

import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import Link from 'next/link'
import { CgMenuLeft } from 'react-icons/cg'
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa'
import { RiCloseLargeFill } from 'react-icons/ri'
import { FaXTwitter } from 'react-icons/fa6'
import { CiHome } from 'react-icons/ci'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [sideOpen, setSideOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
    document.body.style.overflow = menuOpen ? 'auto' : 'hidden'
  }

  const toggleSidebar = () => {
    setSideOpen(!sideOpen)
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '/', icon: CiHome },
    { name: 'About', href: '#about' },
    { name: 'Publishing', href: '#services' },
    { name: 'Education', href: '#contact' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },  
  ]

  return (
    <nav className="fixed w-full flex justify-between items-center px-6 lg:px-12 py-4 z-50 transition-all duration-500">
      {/* Background Layer (safe blur) */}
      <div
        className={`absolute inset-0 -z-10 transition-all duration-500 ${
          scrolled
            ? 'bg-[#fffcf7] shadow-lg border-b border-white/10'
            : 'bg-linear-to-b from-[#2b0909]/40 to-transparent backdrop-blur-sm'
        }`}
      ></div>

      {/* Logo */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-linear-to-r from-[#feeede] to-white opacity-0 group-hover:opacity-30 blur transition duration-300 rounded-full"></div>
        <Image
          src="/logo.png"
          alt="Topnotch Logo"
          width={50}
          height={50}
          className="relative transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-1">
        {navItems.map((item, i) => (
          <Link
            key={i}
            href={item.href}
            className="relative px-5 py-2 font-semibold text-white text-sm uppercase tracking-wide group overflow-hidden"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-[#feeede]">
              {item.name}
            </span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-[#feeede] to-white transition-all duration-300 group-hover:w-full"></span>
            <span className="absolute inset-0 bg-white/5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
        ))}
      </div>

      {/* CTA Buttons */}
      <div className="flex items-center gap-3">
        {/* Sidebar Button */}
        <button
          onClick={toggleSidebar}
          className={`hidden md:flex items-center cursor-pointer gap-2 px-6 py-2.5 rounded-full font-bold uppercase text-xs md:text-sm tracking-wide transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
            scrolled
              ? 'bg-white text-black hover:bg-white shadow-lg'
              : 'bg-[#2b0909] text-[#feeede] shadow-sm shadow-black/50'
          }`}
        >
          <CgMenuLeft size={26} />
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 transform hover:scale-110 active:scale-95"
        >
          <CgMenuLeft size={26} className="text-[#feeede]" />
        </button>
      </div>

      {/* Sidebar via Portal (fixes blur/overflow clipping) */}
      {sideOpen &&
        typeof window !== 'undefined' &&
        createPortal(
          <div className="fixed inset-0 z-9999">
            <div className="absolute top-0 right-0 w-[85%] max-w-sm h-full bg-[#fffcf7] border border-[#2b0909] shadow-xl shadow-[#2b0909] animate-in slide-in-from-right duration-300 border-l">
              <div className="relative h-full flex flex-col overflow-y-auto">
                {/* Header */}
                <div className="relative bg-linear-to-br from-white/5 to-transparent p-6 pb-8">
                  {/* Close */}
                  <div className="flex justify-end mb-6">
                    <button
                      className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 group backdrop-blur-sm"
                      onClick={toggleSidebar}
                      aria-label="Close menu"
                    >
                      <RiCloseLargeFill
                        size={22}
                        className="text-[#2b0909] group-hover:rotate-90 transition-transform duration-300"
                      />
                    </button>
                  </div>

                  {/* Logo */}
                  <div className="flex justify-center relative z-10">
                    <div className="relative">
                      <div className="relative p-3 rounded-lg">
                        <Image
                          src="/logo.png"
                          alt="Topnotch Printing Press Logo"
                          width={100}
                          height={100}
                          className='w-40'
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 px-6 py-2">
               

                  {/* Social Grid */}
                  <div>
                    <p className="text-[#2b0909] text-xs uppercase tracking-widest mb-4 font-semibold flex items-center gap-2">
                      <span className="w-8 h-px bg-[#2b0909]/20"></span>
                      Social Media
                      <span className="flex-1 h-px bg-[#2b0909]/20"></span>
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        {
                          icon: FaFacebook,
                          href: 'https://facebook.com/shakul_shots',
                          name: 'Facebook',
                        },
                        {
                          icon: FaInstagram,
                          href: 'https://instagram.com/shakul_shots',
                          name: 'Instagram',
                        },
                        { icon: FaXTwitter, href: 'https://twitter.com/shakul_shots', name: 'X' },
                        { icon: FaTiktok, href: 'https://www.tiktok.com/@shakul_shots', name: 'TikTok' },
                        {
                          icon: FaYoutube,
                          href: 'https://youtube.com/@shakul_shots',
                          name: 'YouTube',
                        },
                      ].map((social, i) => (
                        <Link
                          key={i}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 transition-all duration-300 transform hover:scale-105"
                        >
                          <social.icon size={24} className="text-[#2b0909] group-hover:text-white" />
                          <span className="text-[#2b0909] text-[10px] group-hover:text-white/80">
                            {social.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="relative mt-auto border-t border-white/10 bg-linear-to-t from-white/5 to-transparent p-6">
                  <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-white/30 to-transparent"></div>
                  <p className="text-center text-[#2b0909] text-xs">© 2025 Shakul Shots</p>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}

      {/* Mobile Menu (unchanged) */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-[#fffcf7]/70 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={toggleMenu}
          ></div>
          <div className="absolute top-0 left-0 w-[60%] max-w-sm h-full bg-[#fffcf7] shadow-2xl animate-in slide-in-from-left duration-300">
            <div className="relative h-full flex flex-col p-6 overflow-y-auto">
              <div className="flex justify-end mb-4">
                <button
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:rotate-90 transform"
                  onClick={toggleMenu}
                >
                  <RiCloseLargeFill size={24} className="text-[#2b0909]" />
                </button>
              </div>
              <div className="flex justify-start items-center mb-8">
                <Image src="/logo.png" alt="Logo" width={30} height={30} />
                <span className='text-[#2b0909] font-bold'>Thaddeus Mbaluka</span>
              </div>
              <ul className="flex flex-col gap-8 mb-8">
                {navItems.map((item, i) => (
                  <li key={i}>
                    <Link
                      href={item.href}
                      onClick={toggleMenu}
                      className="flex items-center justify-between font-semibold text-[#2b0909] text-sm uppercase tracking-wide transition-all duration-300 group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform">
                        {item.name}
                      </span>
                      <span className="text-[#2b0909] opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Social Grid */}
          <div className="absolute bottom-0 w-[60%] p-8 animate-in slide-in-from-left duration-300">
            <p className="text-[#2b0909]/60 text-xs uppercase tracking-widest mb-4 font-semibold flex items-center gap-2">
              <span className="w-8 h-px bg-[#2b0909]/20"></span>
              Social Media
              <span className="flex-1 h-px bg-[#2b0909]/20"></span>
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: FaFacebook, href: 'https://facebook.com/shakul_shots', name: 'Facebook' },
                {
                  icon: FaInstagram,
                  href: 'https://www.instagram.com/shakul_shots',
                  name: 'Instagram',
                },
                { icon: FaXTwitter, href: 'https://twitter.com/shakul_shots', name: 'X' },
                { icon: FaTiktok, href: 'https://www.tiktok.com/@shakul_shots', name: 'TikTok' },
                { icon: FaYoutube, href: 'https://youtube.com/@shakul_shots', name: 'YouTube' },
              ].map((social, i) => (
                <Link
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 transition-all duration-300 transform hover:scale-105"
                >
                  <social.icon size={24} className="text-[#2b0909] group-hover:text-white" />
                  <span className="text-[#2b0909] text-[10px] group-hover:text-white/80">
                    {social.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
