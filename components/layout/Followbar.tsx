import useCurrentUser from "@/hooks/useCurrentUser";
import useUsers from "@/hooks/useUsers";
import Avatar from "../Avatar";

const Followbar = () => {
    const { data: users = [] } = useUsers();
    const { data: currentUser } = useCurrentUser();

    if (users.lenght == 0) {
        return null;
    }

    return (
        <div className="px-6 py-4 hidden lg:block">
            <div className="border border-neutral-800 rounded-xl p-4">
                <h2 className="text-white text-lg font-semibold">Who to follow</h2>
                <div className="flex flex-col gap-6 mt-4">
                    {users.map(
                        (user: Record<string, any>) => (
                            user.id != currentUser?.id ? (
                                <div key={user.id} className="flex flex-row gap-4">
                                    <Avatar
                                        userId={user.id}
                                    />
                                    <div className="flex flex-col">
                                        <p className="text-white font-semibold text-sm">
                                            {user.name}
                                        </p>
                                        <p className="text-neutral-400 text-sm">
                                            @{user.username}
                                        </p>
                                    </div>
                                </div>
                            ) : null
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

export default Followbar;