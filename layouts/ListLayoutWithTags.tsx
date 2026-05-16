'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import tagData from '@/app/tag-data.json'

type Locale = 'en' | 'es'
type TagData = Record<string, Record<string, number>>

interface PaginationProps {
  totalPages: number
  currentPage: number
  locale?: Locale
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
  locale?: Locale
}

function Pagination({ totalPages, currentPage, locale = 'en' }: PaginationProps) {
  const pathname = usePathname()

  // Extract the actual locale from pathname to ensure correctness
  const localeMatch = pathname.match(/^\/([a-z]{2})/)
  const hasLocale = !!localeMatch
  const actualLocale = (localeMatch ? localeMatch[1] : locale) as Locale

  // Extract the base path without the locale prefix and pagination
  const pathWithoutLocale = hasLocale
    ? pathname.replace(new RegExp(`^/${actualLocale}`), '') || '/'
    : pathname
  const basePath =
    pathWithoutLocale
      .replace(/\/page\/\d+\/?$/, '') // Remove any trailing /page/number
      .replace(/\/$/, '') || '' // Remove trailing slash but preserve root

  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages
  const translations = siteMetadata.translations[actualLocale]

  // Build href with locale prefix only if it existed in the original pathname
  const buildHref = (path: string) => (hasLocale ? `/${actualLocale}${path}` : path)

  return (
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            {translations.previous}
          </button>
        )}
        {prevPage && (
          <Link
            href={buildHref(
              currentPage - 1 === 1 ? `${basePath}/` : `${basePath}/page/${currentPage - 1}`
            )}
            rel="prev"
          >
            {translations.previous}
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            {translations.next}
          </button>
        )}
        {nextPage && (
          <Link href={buildHref(`${basePath}/page/${currentPage + 1}`)} rel="next">
            {translations.next}
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
  locale = 'en',
}: ListLayoutProps) {
  const pathname = usePathname()
  const allTagData = tagData as any as TagData
  const tagCounts = allTagData[locale] || {}
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <>
      <div>
        <div className="pt-6 pb-6">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:hidden sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            {title}
          </h1>
        </div>
        <div className="flex sm:space-x-24">
          <div className="hidden h-full max-h-screen max-w-[280px] min-w-[280px] flex-wrap overflow-auto rounded-sm bg-gray-50 pt-5 shadow-md sm:flex dark:bg-gray-900/70 dark:shadow-gray-800/40">
            <div className="px-6 py-4">
              {pathname.startsWith(`/${locale}/blog`) ? (
                <h3 className="text-primary-500 font-bold uppercase">
                  {siteMetadata.translations[locale].allPosts}
                </h3>
              ) : (
                <Link
                  href={`/${locale}/blog`}
                  className="hover:text-primary-500 dark:hover:text-primary-500 font-bold text-gray-700 uppercase dark:text-gray-300"
                >
                  {siteMetadata.translations[locale].allPosts}
                </Link>
              )}
              <ul>
                {sortedTags.map((t) => {
                  return (
                    <li key={t} className="my-3">
                      {decodeURI(pathname.split(`/${locale}/tags/`)[1]) === slug(t) ? (
                        <h3 className="text-primary-500 inline px-3 py-2 text-sm font-bold uppercase">
                          {`${t} (${tagCounts[t]})`}
                        </h3>
                      ) : (
                        <Link
                          href={`/${locale}/tags/${slug(t)}`}
                          className="hover:text-primary-500 dark:hover:text-primary-500 px-3 py-2 text-sm font-medium text-gray-500 uppercase dark:text-gray-300"
                          aria-label={`View posts tagged ${t}`}
                        >
                          {`${t} (${tagCounts[t]})`}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <div>
            <ul>
              {displayPosts.map((post) => {
                const { slug: postSlug, date, title, summary, tags } = post
                return (
                  <li key={postSlug} className="py-5">
                    <article className="flex flex-col space-y-2 xl:space-y-0">
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                          <time dateTime={date} suppressHydrationWarning>
                            {formatDate(date, locale)}
                          </time>
                        </dd>
                      </dl>
                      <div className="space-y-3">
                        <div>
                          <h2 className="text-2xl leading-8 font-bold tracking-tight">
                            <Link
                              href={`/${locale}/blog/${postSlug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags?.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                    </article>
                  </li>
                )
              })}
            </ul>
            {pagination && pagination.totalPages > 1 && (
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                locale={locale}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
