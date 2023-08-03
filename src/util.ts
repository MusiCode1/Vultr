import { vultr, env } from "./vultr-init";

import type {
    list_instances,
    list_snapshots,
    snapshot, instance
} from './types';


export async function get_list_instances() {

    return await vultr.instances.listInstances({
    }) as list_instances;
}

export async function get_list_snapshots() {

    return await vultr.snapshots.listSnapshots({
        description: env.tag
    }) as list_snapshots;
}

export async function get_snapshot_by_id(snapshot_id: string) {
    return await vultr.snapshots.getSnapshot({
        "snapshot-id": snapshot_id
    }) as { snapshot: snapshot };
}

export async function get_instance_by_id(instance_id: string) {
    return await vultr.instances.getInstance({
        "instance-id": instance_id
    }) as { instance: instance };
}

export async function wait_for_snapshot_complete(resource_id: string, resource_type: "instance" | "snapshot") {

    const sleep_ms = 1000 * 1.5;

    console.time(`create-${resource_type}`);

    return await new Promise(async (resolve) => {

        while (true) {

            let status = "";

            if (resource_type === "snapshot") {
                const snapshot = await get_snapshot_by_id(resource_id);

                status = snapshot.snapshot.status;

                if (status === "complete") {
                    break;
                }
            }

            if (resource_type === "instance") {
                const instance = await get_instance_by_id(resource_id);

                status = instance.instance.status;

                if (status === "active") {
                    break;
                }
            }

            console.timeLog(`create-${resource_type}`, status)

            await new Promise((resolve) => setTimeout(resolve, sleep_ms));
        }

        console.timeEnd(`create-${resource_type}`);

        resolve(null);
    });
}
