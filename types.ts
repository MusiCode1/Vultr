
export type list_snapshots = {
    snapshots: snapshot[],
    meta: {}
};

export type create_snapshot = {
    snapshot: snapshot,
    meta: {}
};

export type snapshot = {
    "id": string,
    "date_created": string,
    "description": string,
    "size": number,
    "compressed_size": number,
    "status": "pending" | "complete",
    "os_id": number,
    "app_id": number
};

export type list_instances = {
    instances: instance[],
    meta: {}
}

export type create_instance = {
    instance: instance,
    meta: {}
};

export type instance = {

    "id": "cb676a46-66fd-4dfb-b839-443f2e6c0b60",
    "os": "CentOS SELinux 8 x64",
    "ram": 2048,
    "disk": 55,
    "main_ip": "192.0.2.123",
    "vcpu_count": 1,
    "region": "atl",
    "plan": "vc2-6c-16gb",
    "date_created": "2020-10-10T01:56:20+00:00",
    "status": "active",
    "allowed_bandwidth": 2000,
    "netmask_v4": "255.255.252.0",
    "gateway_v4": "192.0.2.1",
    "power_status": "running",
    "server_status": "ok",
    "v6_network": "2001:0db8:1112:18fb::",
    "v6_main_ip": "2001:0db8:1112:18fb:0200:00ff:fe00:0000",
    "v6_network_size": 64,
    "label": "Example Instance",
    "internal_ip": "",
    "kvm": "https://my.vultr.com/subs/vps/novnc/api.php?data=00example11223344",
    "hostname": "my_hostname",
    "os_id": 215,
    "app_id": 0,
    "image_id": "",
    "firewall_group_id": "",
    "features": [],
    "tags": []
};
