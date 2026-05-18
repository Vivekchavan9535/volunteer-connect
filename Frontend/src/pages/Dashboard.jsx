import Table from "../components/Table";

const Dashboard = ({
    volunteers,
    totalVolunteers,
    pagination,
    page,
    setPage,
    loading,
    location,
    setLocation,
}) => {

    const columns = [
        "name",
        "email",
        "contactNumber",
        "location",
        "languages",
        "availability",
    ];


    return (
        <main className="min-h-screen bg-gray-100">

            <div className="mx-auto max-w-full px-4 py-6">

                <div className="mb-5 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_240px]">

                    <div className="rounded-2xl bg-white px-8 py-5">

                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                            Admin
                        </p>

                        <h1 className="mt-2 text-3xl font-bold text-gray-900">
                            Dashboard
                        </h1>

                        <p className="mt-2 text-gray-500">
                            View and manage volunteer submissions from here.
                        </p>

                    </div>

                    <div className="rounded-2xl bg-white px-8 py-5 text-center">

                        <p className="text-sm font-medium text-blue-700">
                            Total Volunteers
                        </p>

                        <p className="mt-2 text-4xl font-bold text-blue-700">
                            {totalVolunteers}
                        </p>

                    </div>

                </div>

                <div className="mb-5">
                    <input
                        type="search"
                        placeholder="Search: location, language, availability"
                        value={location}
                        onChange={(e) =>
                            setLocation(e.target.value)
                        }
                        className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <p className="mt-2 text-sm text-gray-500">
                        Example:
                        wadi, english, monday
                    </p>

                </div>

                <Table
                    columns={columns}
                    data={volunteers}
                    loading={loading}
                />

                <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-white p-4 sm:flex-row sm:items-center sm:justify-between">

                    <p className="text-sm text-gray-500">
                        Showing page {pagination.currentPage} of {pagination.totalPages}
                    </p>

                    <div className="flex items-center gap-3">

                        <button
                            type="button"
                            disabled={page === 1 || loading}
                            onClick={() =>
                                setPage((currentPage) =>
                                    Math.max(currentPage - 1, 1)
                                )
                            }
                            className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 transition-all hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Previous
                        </button>

                        <button
                            type="button"
                            disabled={
                                page >= pagination.totalPages ||
                                loading
                            }
                            onClick={() =>
                                setPage((currentPage) =>
                                    Math.min(
                                        currentPage + 1,
                                        pagination.totalPages
                                    )
                                )
                            }
                            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Next
                        </button>

                    </div>

                </div>

            </div>

        </main>
    );
};

export default Dashboard;
