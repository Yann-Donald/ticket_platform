import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Collection from '@/components/shared/Collection'
import { auth } from '@clerk/nextjs'
import { getEventsByUser } from '@/lib/actions/event.actions'
import { getOrdersByUser } from '@/lib/actions/order.actions'
import { IOrder } from '@/lib/database/models/order.model'
import { SearchParamProps } from '@/types'

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;
    const ordersPage = Number(searchParams?.ordersPage) || 1;
    const eventsPage = Number(searchParams?.eventsPage) || 1;
    const orders = await getOrdersByUser({ userId, page: ordersPage })
    const orderedEvents = orders?.data.map((order: IOrder) => order.event) || []
    const organizedEvents = await getEventsByUser({ userId, page: eventsPage })
  return (
    <>
        {/*The tickets I purchased*/}
        <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
            <div className="wrapper flex items-center justify-center sm:justify-between">
                <h3 className="h3-bold text-center sm:text-left">My Tickets</h3>
                <Button asChild className="hidden sm:flex">
                    <Link href="/#events">
                        Explore more Events
                    </Link>
                </Button>
            </div>
        </section>

        <section className="wrapper my-8">
            <Collection 
                data={orderedEvents}
                emptyTitle="No Event Tickets purchased yet"
                emptyStateSubtext="Explore events and purchase tickets"
                collectionType="My_Tickets"
                limit={3}
                page={ordersPage} 
                urlParamName='ordersPage'
                totalPages={orders?.totalPages}
            />
        </section>

         {/*The Events I  created*/}
         <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
            <div className="wrapper flex items-center justify-center sm:justify-between">
                <h3 className="h3-bold text-center sm:text-left">Events Organized</h3>
                <Button asChild className="hidden sm:flex">
                    <Link href="/events/create">
                        Create New Events
                    </Link>
                </Button>
            </div>
        </section>
         <section className="wrapper my-8">
            <Collection 
                data={organizedEvents?.data}
                emptyTitle="No Event created yet"
                emptyStateSubtext="Start creating your own events"
                collectionType="Events_Organized"
                limit={6}
                page={eventsPage}
                urlParamName='eventsPage'
                totalPages={organizedEvents?.totalPages}
            />
        </section>
    </>
  )
}

export default ProfilePage