import { useState } from "react";
import { motion, type Variants } from "framer-motion";

import { useProfile } from "../../hooks/useProfile";

import ProfileHero from "../../components/profile/ProfileHero";
import EditProfileDialog from "../../components/profile/EditProfileDialog";
import ChangePasswordDialog from "../../components/profile/ChangePasswordDialog";

import GlassPanel from "../../components/ui/GlassPanel";
import GlassTiltCard from "../../components/ui/GlassTiltCard";
import GlassButton from "../../components/ui/GlassButton";

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut" as const,
    },
  },
};

export default function ProfilePage() {
  const { data: user, isLoading, error } = useProfile();

  const [editOpen, setEditOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="animate-pulse text-slate-400">
          Loading profile...
        </p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <GlassPanel className="mx-auto max-w-xl p-8 text-center">
        <h2 className="text-xl font-semibold text-red-400">
          Failed to load profile
        </h2>

        <p className="mt-2 text-slate-400">
          Please refresh the page and try again.
        </p>
      </GlassPanel>
    );
  }

  return (
    <>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-6xl space-y-8"
      >
        {/* Header */}
        <motion.div variants={item}>
          <GlassPanel className="p-8">
            <h1 className="text-3xl font-bold text-white">
              Profile
            </h1>

            <p className="mt-2 text-slate-400">
              Manage your account settings and security.
            </p>
          </GlassPanel>
        </motion.div>

        {/* Hero */}
        <motion.div variants={item}>
          <ProfileHero
            name={user.name}
            email={user.email}
          />
        </motion.div>

        {/* Personal Information */}
        <motion.div variants={item}>
          <GlassTiltCard>
            <GlassPanel className="group p-6">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Personal Information
                  </h2>

                  <p className="mt-1 text-sm text-slate-400">
                    Update your account information.
                  </p>
                </div>

                <GlassButton onClick={() => setEditOpen(true)}>
                  Edit Profile
                </GlassButton>
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div>
                  <p className="text-sm text-slate-400">
                    Name
                  </p>

                  <p className="mt-2 text-lg font-semibold text-white">
                    {user.name}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-400">
                    Email
                  </p>

                  <p className="mt-2 text-lg font-semibold text-white">
                    {user.email}
                  </p>
                </div>
              </div>
            </GlassPanel>
          </GlassTiltCard>
        </motion.div>

        {/* Security */}
        <motion.div variants={item}>
          <GlassTiltCard>
            <GlassPanel className="group p-6">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Security
                  </h2>

                  <p className="mt-1 text-sm text-slate-400">
                    Keep your account secure by updating your password regularly.
                  </p>
                </div>

                <GlassButton
                  onClick={() => setPasswordOpen(true)}
                  className="
    from-red-500/70
    to-rose-600/70
    hover:shadow-red-500/20
  "
                >
                  Change Password
                </GlassButton>
              </div>
            </GlassPanel>
          </GlassTiltCard>
        </motion.div>
      </motion.div>

      <EditProfileDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        name={user.name}
        email={user.email}
      />

      <ChangePasswordDialog
        open={passwordOpen}
        onClose={() => setPasswordOpen(false)}
      />
    </>
  );
}