import { Modal, List, Button, Spin, Tag, Empty } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useGetUserInvitations } from "../../hooks/invitation/use-get-pending-invitations";
import { useRespondToInvitation } from "../../hooks/invitation/use-respond-to-invitation";

interface PendingInvitesModalProps {
  open: boolean;
  onClose: () => void;
}

export default function PendingInvitesModal({ open, onClose }: PendingInvitesModalProps) {
  const { data: invitations, isLoading } = useGetUserInvitations();
  const { mutate: respondToInvitation, isPending: isRespondingToInvitation } = useRespondToInvitation();

  const pendingInvitations = invitations?.filter((inv) => inv.status === "PENDING");

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={
        <div className="flex items-center gap-2">
          <MailOutlined />
          <span>Pending Invitations</span>
        </div>
      }
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
      ]}
      width={700}
    >
      {isLoading ? (
        <div className="flex justify-center p-8">
          <Spin size="large" />
        </div>
      ) : pendingInvitations && pendingInvitations.length > 0 ? (
        <List
          dataSource={pendingInvitations}
          renderItem={(invitation) => (
            <List.Item
              actions={[
                <Button
                  key="accept"
                  type="primary"
                  size="small"
                  loading={isRespondingToInvitation}
                  onClick={() => respondToInvitation({ invitationId: invitation.id, response: "ACCEPTED" })}
                >
                  Accept
                </Button>,
                <Button
                  key="reject"
                  danger
                  size="small"
                  loading={isRespondingToInvitation}
                  onClick={() => respondToInvitation({ invitationId: invitation.id, response: "REJECTED" })}
                >
                  Reject
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={<span className="font-semibold text-lg">{invitation.board.name}</span>}
                description={
                  <div className="flex flex-col gap-2 mt-1">
                    <span className="text-sm text-gray-600">
                      Invited by: <span className="font-medium">{invitation.board.owner.name}</span>
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(invitation.invitedAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    <Tag color="orange" className="w-fit">
                      {invitation.status}
                    </Tag>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      ) : (
        <Empty description="No pending invitations" />
      )}
    </Modal>
  );
}
