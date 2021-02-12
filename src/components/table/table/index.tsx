import React from "react";
import { Table as AntdTable, Button, Space, Popconfirm } from "antd";
import { TablePaginationConfig } from "antd/lib/table";
import { useHistory } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { Column } from "@components";
import { Record } from "@interfaces";
import { useDelete } from "@hooks";

export interface TableProps {
    resourceName?: string;
    dataSource?: Record[];
    loading?: boolean;
    pagination?: false | TablePaginationConfig;
    canEdit?: boolean;
    canDelete?: boolean;
    onConfirmDelete?: (id: string | number) => void;
}

export const Table: React.FC<TableProps> = ({
    resourceName,
    dataSource,
    loading,
    pagination,
    canEdit,
    canDelete,
    children,
}) => {
    const history = useHistory();

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { mutate, isLoading } = useDelete(resourceName!);

    const renderDeleteButton = (id: number | string): React.ReactNode => {
        return (
            <Popconfirm
                key="delete"
                okText="Delete"
                okType="danger"
                title="Are you sure?"
                okButtonProps={{ disabled: isLoading }}
                onConfirm={(): void => {
                    mutate({ id });
                }}
            >
                <Button
                    type="default"
                    size="small"
                    danger
                    icon={<DeleteOutlined />}
                >
                    Delete
                </Button>
            </Popconfirm>
        );
    };

    const renderActions = (): React.ReactNode => {
        if (canEdit || canDelete) {
            return (
                <Column
                    title="Actions"
                    dataIndex="actions"
                    key="actions"
                    render={(
                        _text: string | number,
                        record: {
                            id: string | number;
                        },
                    ): React.ReactNode => (
                        <Space>
                            {canEdit && (
                                <Button
                                    onClick={(): void => {
                                        history.push(
                                            `/resources/${resourceName}/edit/${record.id}`,
                                        );
                                    }}
                                    type="default"
                                    size="small"
                                    icon={<EditOutlined />}
                                >
                                    Edit
                                </Button>
                            )}
                            {canDelete && renderDeleteButton(record.id)}
                        </Space>
                    )}
                />
            );
        }

        return null;
    };

    return (
        <React.Fragment>
            <AntdTable
                style={{ width: "100%" }}
                dataSource={dataSource}
                loading={loading}
                pagination={pagination}
                onChange={(pagination): void => {
                    history.push(
                        `/resources/${resourceName}?current=${pagination.current}&pageSize=${pagination.pageSize}`,
                    );
                }}
            >
                {children}
                {renderActions()}
            </AntdTable>
        </React.Fragment>
    );
};