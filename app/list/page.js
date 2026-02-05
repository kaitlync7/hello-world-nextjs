"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ListPage() {
    const [domains, setDomains] = useState([]);

    useEffect(() => {
        async function fetchDomains() {
            const { data, error } = await supabase
                .from("allowed_signup_domains")
                .select("id, apex_domain, created_datetime_utc");

            if (error) {
                console.error("Supabase error:", error);
            } else {
                setDomains(data);
            }
        }

        fetchDomains();
    }, []);

    return (
        <main style={{ padding: "2rem" }}>
            <h1>Allowed Signup Domains</h1>

            <table style={{ borderCollapse: "collapse", width: "100%" }}>
                <thead>
                <tr>
                    <th style={{ border: "1px solid black", padding: "0.5rem" }}>ID</th>
                    <th style={{ border: "1px solid black", padding: "0.5rem" }}>Domain</th>
                    <th style={{ border: "1px solid black", padding: "0.5rem" }}>Created</th>
                </tr>
                </thead>
                <tbody>
                {domains.map((domain) => (
                    <tr key={domain.id}>
                        <td style={{ border: "1px solid black", padding: "0.5rem" }}>{domain.id}</td>
                        <td style={{ border: "1px solid black", padding: "0.5rem" }}>{domain.apex_domain}</td>
                        <td style={{ border: "1px solid black", padding: "0.5rem" }}>
                            {new Date(domain.created_datetime_utc).toLocaleDateString()}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

        </main>
    );
}
