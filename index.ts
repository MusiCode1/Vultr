

import "dotenv/config";
import * as VultrNode from '@vultr/vultr-node';
import { env } from "node:process";
import type { instance, list_instances, list_snapshots, snapshot, create_snapshot, create_instance } from './types';


const tag = env.VULTR_TAG;

// Initialize the instance with your configuration
const vultr = VultrNode.initialize({
    apiKey: env.VULTR_KEY
});



(async () => {

    delete_server();
})();

async function start_server() {

    const region = env.VULTR_REGION,
        plan = env.VULTR_PLAN,
        firewall_group_id = env.VULTR_FIREWELL_GROUP_ID;

    const list_snapshots = await list_snapshots_f();

    const snapshot_id = list_snapshots.snapshots[0].id;

    const crt_ins: create_instance = await vultr.instances.createInstance({
        region,
        plan,
        snapshot_id,
        enable_ipv6: true,
        tags: [tag],
        firewall_group_id
    });

    console.log(crt_ins);


};

async function delete_server() {

    const list_instances = await list_instances_f();
    const list_snapshots = await list_snapshots_f();

    const instance = list_instances.instances[0];

    const create_snapshot: create_snapshot = await vultr.snapshots.createSnapshot({
        instance_id: instance.id,
        description: tag
    });

    console.time("create-snapshot");
    await wait_for_snapshot_complete(create_snapshot.snapshot.id);
    console.timeEnd("create-snapshot");


    const promises: Array<Promise<any>> = [];

    list_snapshots.snapshots.map((snapshot) => {

        promises.push(
            vultr.snapshots.deleteSnapshot({
                "snapshot-id": snapshot.id
            }).then(
                () => console.log("snapshot", snapshot.id, "deleted.")
            )
        );
    });

    promises.push(
        vultr.instances.deleteInstance({
            "instance-id": instance.id
        }).then(
            () => console.log("instance", instance.id, "deleted.")
        )
    );

    const res = await Promise.all(promises);

    console.log("done.");


};

async function list_instances_f() {

    const res: list_instances = await vultr.instances.listInstances({});

    return res;
}

async function list_snapshots_f() {

    const res: list_snapshots = await vultr.snapshots.listSnapshots({
        description: tag
    });

    return res;
}

async function wait_for_snapshot_complete(snapshot_id: string) {

    return await new Promise(async (resolve) => {

        while (true) {

            const snapshot = await get_snapshot(snapshot_id);

            if (snapshot.snapshot.status === "complete") {
                break;
            }

            console.timeLog("create-snapshot", snapshot.snapshot.status)

            await new Promise((resolve) => setTimeout(resolve, 1000 * 1.5));
        }

        resolve(null);
    })
}

async function get_snapshot(snapshot_id: string) {
    return await vultr.snapshots.getSnapshot({
        "snapshot-id": snapshot_id
    }) as { snapshot: snapshot };
}

async function get_instance(instance_id: string) {
    return await vultr.instances.getInstance({
        "instance-id": instance_id
    }) as { instance: instance };
}